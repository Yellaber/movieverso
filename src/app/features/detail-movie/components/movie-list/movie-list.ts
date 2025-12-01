import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, Observable, of, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CarouselMovies } from '@components/carousel-movies/carousel-movies';
import { CarouselTitle } from '@components/carousel-movies/carousel-title/carousel-title';
import { Notification } from '@components/notification/notification';
import { DetailService } from '@services';
import { CarouselConfig, Movie } from '@interfaces';

type TypeMovieList = 'recommendations' | 'similar' | 'collection';

interface DataNotification {
  title: string,
  message: string
};

@Component({
  selector: 'movie-list',
  imports: [ CarouselMovies, CarouselTitle, Notification ],
  template: `
    @if(movies.hasValue() && movies.value().length > 0) {
      <carousel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <carousel-title [carouselTitle]="carouselConfig().carouselTitle!" route=""/>
      <notification [notificationTitle]="notification()?.title!" [message]="notification()?.message!"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieList {
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
  notification = signal<DataNotification | undefined>(undefined);

  private getTypeMovieListTranslation(typeMovieList: TypeMovieList): Observable<string> {
    return this.translateService.get(`detailMovie.movieList.${typeMovieList}.title`);
  }

  private getRelatedMovies(movieId: number): Observable<Movie[]> {
    switch(this.typeMovieList()) {
      case 'collection':
        return (this.id() !== 0)? this.detailService.getMovieCollectionById(movieId)
          .pipe(map(({ parts }) => parts)): of([]);
      default:
        return (this.id() !== 0)? this.detailService.getRelationedMovies(this.typeMovieList(), movieId)
          .pipe(map(({ results }) => results)): of([]);
    };
  }

  private loadNotificationTranslation(key: string) {
    this.translateService.get(key).subscribe((notification: { title: string, message: string }) =>
      this.notification.set(notification)
    );
  }
}
