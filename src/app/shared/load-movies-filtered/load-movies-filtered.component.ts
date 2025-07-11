import { ChangeDetectionStrategy, Component, HostListener, inject, input, OnInit, signal, effect } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CarruselCardMoviesComponent } from '@shared/carrusel-movies/carrusel-card-movies/carrusel-card-movies.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { CardMovieSkeletonComponent } from '@shared/carrusel-movies-skeleton/card-movie-skeleton/card-movie-skeleton.component';
import { QueryParamsService, ScrollService, TmdbService } from '@services/';
import { QueryParams } from '@interfaces/';

@Component({
  selector: 'load-movies-filtered',
  imports: [
    CarruselCardMoviesComponent,
    NotificationComponent,
    CardMovieSkeletonComponent,
  ],
  template: `
    <div class="flex flex-wrap justify-evenly gap-5">
      @if(!moviesFiltered.isLoading()) {
        @for(movieResponse of moviesFiltered.value(); track $index) {
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
export class LoadMoviesFilteredComponent implements OnInit {
  cardMoviesSkeleton = Array(20);
  endPoint = input.required<string>();
  showModal = signal<boolean>(false);
  page = signal<number>(1);
  queryParams = signal<QueryParams>({});
  moviesFiltered = rxResource({
    request: () => ({endPoint: this.endPoint(), page: this.page()}),
    loader: ({request}) => {
      const endPoint = request.endPoint;
      const page = request.page;
      return this.tmdbService.getMoviesFilteredByCategory(endPoint, page);
    }
  });
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.scrollService.isAtBottom() && this.moviesFiltered.hasValue()) {
      const movieResponse = this.moviesFiltered.value()[this.page() - 1];
      if(this.page() < movieResponse.total_pages) {
        this.page.update(value => value + 1);
      }
    }
  };
  private tmdbService = inject(TmdbService);
  private scrollService = inject(ScrollService);
  //private queryParamsService = inject(QueryParamsService);

  queryParamsChanged = effect(() => {
    const queryParams = this.queryParams();
    if(queryParams) {
      this.page.set(1);
      this.scrollService.scrollTop();
    }
  });

  ngOnInit() {
    //const queryParams = this.queryParamsService.get(this.currentComponent());
    //this.queryParams.set(queryParams);
  }

  onShowModal() {
    this.showModal.set(true);
  };

  onCloseModal(event: boolean) {
    this.showModal.set(event);
  };

  onQueryParams(event: QueryParams) {
    this.queryParams.set(event);
  };
}
