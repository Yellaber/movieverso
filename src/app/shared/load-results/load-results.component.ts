import { ChangeDetectionStrategy, Component, HostListener, OnInit, ResourceRef, inject, input, signal } from '@angular/core';
import { CarruselCardMoviesComponent } from '@shared/carrusel-movies/components/carrusel-card-movies/carrusel-card-movies.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { CardMovieSkeletonComponent } from '@shared/carrusel-movies-skeleton/components/card-movie-skeleton/card-movie-skeleton.component';
import { ScrollService } from '@services/';
import { MovieResponse } from '@interfaces/';

@Component({
  selector: 'load-results',
  imports: [
    CarruselCardMoviesComponent,
    NotificationComponent,
    CardMovieSkeletonComponent
  ],
  template: `
    <div class="flex flex-wrap justify-evenly gap-5">
      @if(!movies().isLoading()) {
        @for(movieResponse of movies().value(); track $index) {
          @for(movie of movieResponse.results; track movie.id) {
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadResultsComponent implements OnInit {
  private scrollService = inject(ScrollService);
  cardMoviesSkeleton = Array(20);
  page = signal<number>(1);
  movies = input.required<ResourceRef<MovieResponse[] | undefined>>();
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.scrollService.isAtBottom() && this.movies().hasValue()) {
      const movieResponse = this.movies().value()![this.page() - 1];
      if(this.page() < movieResponse.total_pages) {
        this.page.update(value => value + 1);
      }
    }
  };

  ngOnInit() {
    this.scrollService.scrollTop();
  };
}
