import { ChangeDetectionStrategy, Component, effect, HostListener, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { CarruselCardMoviesComponent } from '@shared/carrusel-movies/carrusel-card-movies/carrusel-card-movies.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { UpcomingMoviesSkeletonComponent } from '../upcoming-movies-skeleton/upcoming-movies-skeleton.component';
import { TmdbService } from '@services/';
import { Genre } from '@interfaces/';

@Component({
  selector: 'load-upcoming-movies',
  imports: [
    CarruselCardMoviesComponent,
    NotificationComponent,
    UpcomingMoviesSkeletonComponent
  ],
  template: `
    @if(!upcomingMoviesFiltered.isLoading()) {
      @for(movieResponse of upcomingMoviesFiltered.value(); track $index) {
        @for(movie of movieResponse.results; track $index) {
          <carrusel-card-movies [movie]="movie" bgCardFooter="bg-stone-800"/>
        } @empty {
          <notification notificationTitle="Pantalla en blanco" message="Silencio absoluto... No hay títulos que coincidan con tu búsqueda. ¡Prueba ajustando el filtro y volvamos a rodar!"/>
        }
      }
    } @else {
        <upcoming-movies-skeleton/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-wrap justify-evenly gap-5' }
})
export class LoadUpcomingMoviesComponent {
  private platformId = inject(PLATFORM_ID);
  private tmdbService = inject(TmdbService);
  page = signal<number>(1);
  genresSelected = input.required<Genre[]>();
  upcomingMoviesFiltered = rxResource({
    request: () => ({genres: this.genresSelected(), page: this.page()}),
    loader: ({request}) => {
      const genresIdSelected = this.getGenresId(request.genres);
      const page = request.page;
      return this.tmdbService.getUpcomingMoviesFiltered(genresIdSelected, page)
    }
  });
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.loadNextPage();
  };

  pageInitializer = effect(() => {
    if(isPlatformBrowser(this.platformId)) {
      window.scrollTo({top: 0});
    }
    const genres = this.genresSelected();
    if(genres) {
      this.page.set(1);
    }
  });

  loadNextPage() {
    if(this.isAtBottom() && this.upcomingMoviesFiltered.hasValue()) {
      const moviesPagination = this.upcomingMoviesFiltered.value();
      const totalPages = moviesPagination[this.page() - 1].total_pages;
      if(this.page() === totalPages) {
        return;
      }
      this.page.update(value => value + 1);
    }
  };

  isAtBottom(): boolean {
    if(isPlatformBrowser(this.platformId)) {
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      return scrollTop + clientHeight + 300 >= scrollHeight;
    }
    return false;
  };

  getGenresId(genresSelected: Genre[]): string {
    const genresId = genresSelected.map(genre => genre.id);
    return genresId.toString();
  };
}
