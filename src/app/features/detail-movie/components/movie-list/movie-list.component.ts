import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { CarruselMoviesComponent } from '@shared/components/carrusel-movies/carrusel-movies.component';
import { CarruselTitleComponent } from '@shared/components/carrusel-movies/carrusel-title/carrusel-title.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { DetailService } from '../../services/detail.service';
import { CarouselConfig, Movie } from '@shared/interfaces';

type TypeMovieList = 'recommendations' | 'similar' | 'collection';

interface Notification {
  title: string,
  message: string
};

@Component({
  selector: 'movie-list',
  imports: [
    CarruselMoviesComponent,
    CarruselTitleComponent,
    NotificationComponent,
  ],
  template: `
    @if(movies.hasValue() && movies.value().length > 0) {
      <carrusel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <carrusel-title [carruselTitle]="carouselTitle()" route=""/>
      <notification [notificationTitle]="getNotification().title" [message]="getNotification().message"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
  private detailService = inject(DetailService);
  typeMovieList = input.required<TypeMovieList>();
  hasRoute = input<boolean>(true);
  movieId = input.required<number>();
  carouselTitle = computed(() => {
    switch(this.typeMovieList()) {
      case 'recommendations':
        return 'Recomendadas';
      case 'similar':
        return 'Similares';
      case 'collection':
        return 'Colección';
    }
  });
  movies = rxResource({
    request: this.movieId,
    loader: () => this.getRelationedMovies()
  });
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.carouselTitle(),
    text: '',
    movies: this.movies.value()!,
    route: this.hasRoute()? `${this.typeMovieList()}`: '',
    bgButtons: 'from-stone-800',
    bgCardFooter: 'bg-stone-700'
  }));

  getRelationedMovies(): Observable<Movie[] | undefined> {
    switch(this.typeMovieList()) {
      case 'collection':
        return this.detailService.getMovieCollectionById(this.movieId()!)
          .pipe(map(({ parts }) => parts));
      default:
        return this.detailService.getRelationedMovies(this.typeMovieList(), this.movieId()!)
          .pipe(map(({ results }) => results));
    }
  };

  getNotification(): Notification {
    switch(this.typeMovieList()) {
      case('recommendations'):
        return {
          title: 'Sin recomendaciones.',
          message: 'Parece que esta película es única en su especie. ¡Ni los algoritmos supieron qué sugerirte!'
        };
      case('similar'):
        return {
          title: 'Irrepetible.',
          message: 'Buscamos algo parecido, pero nada le llega a los talones a esta película. ¡Es un caso especial!'
        };
      default:
        return {
          title: 'Sin familia cinematográfica.',
          message: 'Esta película es como un lobo solitario… No pertenece a ninguna colección. ¡Libre como el viento!'
        };
    }
  };
}
