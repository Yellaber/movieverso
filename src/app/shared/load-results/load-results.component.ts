import { ChangeDetectionStrategy, Component, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { CarruselCardMoviesComponent } from '../carrusel-movies/carrusel-card-movies/carrusel-card-movies.component';
import { NotificationComponent } from '../notification/notification.component';
import { CardMovieSkeletonComponent } from '../carrusel-movies-skeleton/card-movie-skeleton/card-movie-skeleton.component';
import { ScrollService, TmdbService } from '@services/';
import { MovieResponse } from '@interfaces/';

type TypeResults = 'recommendations' | 'similar';

@Component({
  selector: 'load-results',
  imports: [CarruselCardMoviesComponent, NotificationComponent, CardMovieSkeletonComponent],
  template: `
    <div class="flex flex-wrap justify-evenly gap-5">
      @if(!movies.isLoading()) {
        @for(movieResponse of movies.value(); track $index) {
          @for(movie of movieResponse.results; track movie.id) {
            <carrusel-card-movies [movie]="movie" bgCardFooter="bg-stone-800"/>
          }
        } @empty {
            <notification notificationTitle="Pantalla en blanco" message="Silencio absoluto... No hay títulos que coincidan con tu búsqueda. ¡Prueba ajustando el filtro y volvamos a rodar!"/>
          }
      } @else {
        @for(_ of cardMoviesSkeleton; track $index) {
          <card-movie-skeleton/>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export class LoadResultsComponent implements OnInit {
  cardMoviesSkeleton = Array(20);
  movieId = input.required<number>();
  typeResult = input.required<TypeResults>();
  page = signal<number>(1);
  movies = rxResource({
    request: () => ({typeResult: this.typeResult(), movieId: this.movieId(), page: this.page()}),
    loader: ({request}) => {
      const typeResult = request.typeResult;
      const movieId = request.movieId;
      const page = request.page;
      return this.tmdbService.getMoviesBasedIn(typeResult, movieId, page);
    }
  });
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.scrollService.isAtBottom() && this.movies.hasValue()) {
      const movieResponse = this.movies.value()[this.page() - 1];
      if(this.page() < movieResponse.total_pages) {
        this.page.update(value => value + 1);
      }
    }
  };
  private tmdbService = inject(TmdbService);
  private scrollService = inject(ScrollService);

  ngOnInit() {
    this.scrollService.scrollTop();
  }
}
