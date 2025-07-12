import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CarruselMoviesComponent } from '@shared/carrusel-movies/carrusel-movies.component';
import { CarruselTitleComponent } from '@shared/carrusel-movies/carrusel-title/carrusel-title.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { CarouselConfig, Movie } from '@interfaces/';

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
    @if(movies() && movies().length > 0) {
      <carrusel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <carrusel-title [carruselTitle]="carouselTitle()" route=""/>
      <notification [notificationTitle]="getNotification().title" [message]="getNotification().message"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
  typeMovieList = input.required<TypeMovieList>();
  hasRoute = input<boolean>(true);
  movies = input.required<Movie[]>();
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
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.carouselTitle(),
    movies: this.movies(),
    route: this.hasRoute()? `${this.typeMovieList()}`: '',
    bgButtons: 'from-stone-800',
    bgCardFooter: 'bg-stone-700'
  }));

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
      case('collection'):
        return {
          title: 'Sin familia cinematográfica.',
          message: 'Esta película es como un lobo solitario… No pertenece a ninguna colección. ¡Libre como el viento!'
        };
    }
  };
}
