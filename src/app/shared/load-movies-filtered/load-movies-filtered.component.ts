import { ChangeDetectionStrategy, Component, effect, HostListener, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { CarruselCardMoviesComponent } from '@shared/carrusel-movies/carrusel-card-movies/carrusel-card-movies.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { CardMovieSkeletonComponent } from '@shared/carrusel-movies-skeleton/card-movie-skeleton/card-movie-skeleton.component';
import { TmdbService } from '@services/';
import { QueryParams } from '@interfaces/';

@Component({
  selector: 'load-movies-filtered',
  imports: [
    CarruselCardMoviesComponent,
    NotificationComponent,
    CardMovieSkeletonComponent
  ],
  template: `
    @if(!moviesFiltered.isLoading()) {
      @for(movieResponse of moviesFiltered.value(); track $index) {
        @for(movie of movieResponse.results; track $index) {
          <carrusel-card-movies [movie]="movie" bgCardFooter="bg-stone-800"/>
        } @empty {
          <notification notificationTitle="Pantalla en blanco" message="Silencio absoluto... No hay títulos que coincidan con tu búsqueda. ¡Prueba ajustando el filtro y volvamos a rodar!"/>
        }
      }
    } @else {
        @for(_ of cardMoviesSkeleton; track $index) {
          <card-movie-skeleton/>
        }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-wrap justify-evenly gap-5' }
})
export class LoadMoviesFilteredComponent {
  private platformId = inject(PLATFORM_ID);
  private tmdbService = inject(TmdbService);
  cardMoviesSkeleton = Array(20);
  page = signal<number>(1);
  queryParams = input.required<QueryParams>();
  moviesFiltered = rxResource({
    request: () => ({genres: this.queryParams(), page: this.page()}),
    loader: ({request}) => {
      const page = request.page;
      return this.tmdbService.getMoviesFiltered(this.queryParams(), page)
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
    const genres = this.queryParams().withGenres ?? [];
    if(genres) {
      this.page.set(1);
    }
  });

  loadNextPage() {
    if(this.isAtBottom() && this.moviesFiltered.hasValue()) {
      const moviesPagination = this.moviesFiltered.value();
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
}
