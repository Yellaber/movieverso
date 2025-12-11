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
    @if(relatedMovies.hasValue() && relatedMovies.value().length > 0) {
      <carousel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <carousel-title [carouselTitle]="carouselConfig().carouselTitle!"/>
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
  carouselTitleTranslation = rxResource({
    params: this.typeMovieList,
    stream: ({ params }) => this.translateService.get(`detailMovie.movieList.${params}.title`)
  });
  relatedMovies = rxResource({
    params: this.id,
    stream: ({ params }) => this.getRelatedMovies(params)
      .pipe(tap(movies => this.loadNotificationTranslation(`detailMovie.movieList.${this.typeMovieList()}.notification`, movies)))
  });
  movies = computed<Movie[]>(() => this.relatedMovies.hasValue()? this.relatedMovies.value(): []);
  route = computed<string>(() => (this.id() !== 0)? `${this.typeMovieList()}`: '');
  getCardSeeMore = computed<Movie>(() => ({
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: -1,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: this.route(),
    release_date: new Date(),
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
  }));
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.carouselTitleTranslation.hasValue()? this.carouselTitleTranslation.value(): '',
    movies: this.typeMovieList() === 'collection'? this.movies(): [ ...this.movies(), this.getCardSeeMore() ],
    bgButtons: 'from-stone-800',
  }));
  notification = signal<DataNotification | undefined>(undefined);

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

  private loadNotificationTranslation(key: string, movies: Movie[]) {
    if(movies && movies.length === 0) {
      this.translateService.get(key).subscribe((notification: { title: string, message: string }) => this.notification.set(notification));
    }
  }
}
