import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CarruselMoviesComponent } from '@shared/carrusel-movies/carrusel-movies.component';
import { CarruselTitleComponent } from '@shared/carrusel-movies/carrusel-title/carrusel-title.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { CarouselConfig, Movie } from '@interfaces/';

type TypeMovieList = 'Recomendadas' | 'Similares' | 'Colección';

interface Notification {
  title: string,
  message: string
};

@Component({
  selector: 'movie-list',
  imports: [CarruselMoviesComponent, CarruselTitleComponent, NotificationComponent],
  template: `
    @if(movies().length > 0) {
      <carrusel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <carrusel-title [carruselTitle]="typeMovieList()" route=""/>
      <notification [notificationTitle]="getNotification().title"
      [message]="getNotification().message"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
  typeMovieList = input.required<TypeMovieList>();
  hasRoute = input<boolean>(true);
  movies = input.required<Movie[]>();
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.typeMovieList(),
    movies: this.movies(),
    route: this.hasRoute()? `/list`: '',
    bgButtons: 'from-stone-800',
    bgCardFooter: 'bg-stone-700'
  }));

  getNotification(): Notification {
    switch(this.typeMovieList()) {
      case('Recomendadas'):
        return {
          title: 'Sin recomendaciones',
          message: 'Parece que esta película es única en su especie. ¡Ni los algoritmos supieron qué sugerirte!'
        };
      case('Similares'):
        return {
          title: 'Irrepetible',
          message: 'Buscamos algo parecido, pero nada le llega a los talones a esta película. ¡Es un caso especial!'
        };
      case('Colección'):
        return {
          title: 'Sin familia cinematográfica',
          message: 'Esta película es como un lobo solitario… No pertenece a ninguna colección. ¡Libre como el viento!'
        };
    }
  };
}
