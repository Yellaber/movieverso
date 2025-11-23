import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, Observable, of, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
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
    NotificationComponent
  ],
  template: `
    @if(movies.hasValue() && movies.value().length > 0) {
      <carrusel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <carrusel-title [carruselTitle]="carouselConfig().carouselTitle!" route=""/>
      <notification [notificationTitle]="notification()?.title!" [message]="notification()?.message!"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
  private detailService = inject(DetailService);
  private translateService = inject(TranslateService);
  typeMovieList = input.required<TypeMovieList>();
  movieId = input.required<number | undefined>();
  id = computed<number>(() => this.movieId()?? 0);
  carouselTitle = rxResource({
    params: this.typeMovieList,
    stream: ({ params }) => this.getTypeMovieListTranslation(params)
  });
  movies = rxResource({
    params: this.id,
    stream: ({ params }) => this.getRelatedMovies(params).pipe(
      tap(movies => {
        if(movies && movies.length === 0) {
          this.loadNotificationTranslation(`detailMovie.movieList.${this.typeMovieList()}.notification`);
        }
      })
    )
  });
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.carouselTitle.hasValue()? this.carouselTitle.value(): '',
    movies: this.movies.value()?? [],
    route: (this.id() !== 0)? `${this.typeMovieList()}`: '',
    bgButtons: 'from-stone-800',
    bgCardFooter: 'bg-stone-700'
  }));
  notification = signal<Notification | undefined>(undefined);

  private getTypeMovieListTranslation(typeMovieList: TypeMovieList): Observable<string> {
    return this.translateService.get(`detailMovie.movieList.${typeMovieList}.title`);
  };

  private getRelatedMovies(movieId: number): Observable<Movie[]> {
    switch(this.typeMovieList()) {
      case 'collection':
        return (this.id() !== 0)? this.detailService.getMovieCollectionById(movieId).pipe(map(({ parts }) => parts)): of([]);
      default:
        return (this.id() !== 0)? this.detailService.getRelationedMovies(this.typeMovieList(), movieId)
          .pipe(map(({ results }) => results)): of([]);
    };
  };

  private loadNotificationTranslation(key: string) {
    this.translateService.get(key).subscribe((notification: { title: string, message: string }) =>
      this.notification.set(notification)
    );
  };
};
