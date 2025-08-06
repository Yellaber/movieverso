import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, Observable, of, tap } from 'rxjs';
import { CarruselMoviesComponent } from '@shared/components/carrusel-movies/carrusel-movies.component';
import { CarruselTitleComponent } from '@shared/components/carrusel-movies/carrusel-title/carrusel-title.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { DetailService } from '../../services/detail.service';
import { CarouselConfig, Movie } from '@shared/interfaces';
import { TranslateService } from '@ngx-translate/core';

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
    NotificationComponent
  ],
  template: `
    @if(movies.hasValue() && movies.value().length > 0) {
      <carrusel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <carrusel-title [carruselTitle]="carouselTitle.value()!" route=""/>
      <notification [notificationTitle]="notification()?.title!" [message]="notification()?.message!"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
  private detailService = inject(DetailService);
  private translateService = inject(TranslateService);
  typeMovieList = input.required<TypeMovieList>();
  hasRoute = input<boolean>(true);
  movieId = input.required<number>();
  carouselTitle = rxResource({
    request: this.typeMovieList,
    loader: () => this.getTypeMovieListTranslation()
  });
  movies = rxResource({
    request: this.movieId,
    loader: () => this.getRelatedMovies().pipe(
      tap(movies => {
        if(movies && movies.length === 0) {
          this.loadNotificationTranslation(`detailMovie.movieList.${this.typeMovieList()}.notification`);
        }
      })
    )
  });
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.carouselTitle.value()?? '',
    text: '',
    movies: this.movies.value()?? [],
    route: this.hasRoute()? `${this.typeMovieList()}`: '',
    bgButtons: 'from-stone-800',
    bgCardFooter: 'bg-stone-700'
  }));
  notification = signal<Notification | undefined>(undefined);

  private getTypeMovieListTranslation(): Observable<string | undefined> {
    return this.translateService.get(`detailMovie.movieList.${this.typeMovieList()}.title`);
  };

  private getRelatedMovies(): Observable<Movie[] | undefined> {
    switch(this.typeMovieList()) {
      case 'collection':
        return (this.movieId() !== -1)? this.detailService.getMovieCollectionById(this.movieId())
          .pipe(map(({ parts }) => parts)): of([]);
      default:
        return this.detailService.getRelationedMovies(this.typeMovieList(), this.movieId())
          .pipe(map(({ results }) => results));
    }
  };

  private loadNotificationTranslation(key: string) {
    this.translateService.get(key).subscribe((notification: { title: string, message: string }) =>
      this.notification.set(notification)
    );
  };
}
