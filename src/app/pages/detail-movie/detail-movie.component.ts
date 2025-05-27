import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerDetailComponent } from '@components/banner-detail/banner-detail.component';
import { SideDetailComponent } from '@components/side-detail/side-detail.component';
import { BannerDetailSkeletonComponent } from '@components/banner-detail-skeleton/banner-detail-skeleton.component';
import { SideDetailSkeletonComponent } from '@components/side-detail-skeleton/side-detail-skeleton.component';
import { CarruselMoviesSkeletonComponent } from '@components/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { MovieListComponent } from '@components/movie-list/movie-list.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { environment } from '@environments/environment.developments';
import { TmdbService, SeoFriendlyService } from '@services/';
import { DetailMovieResponse, Keyword, Movie, Trailer } from '@interfaces/';
import { YoutubeVideoComponent } from '@shared/youtube-video/youtube-video.component';

@Component({
  imports: [
    FontAwesomeModule,
    BannerDetailComponent,
    SideDetailComponent,
    BannerDetailSkeletonComponent,
    SideDetailSkeletonComponent,
    MovieListComponent,
    NotificationComponent,
    CarruselMoviesSkeletonComponent,
    YoutubeVideoComponent
  ],
  templateUrl: './detail-movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DetailMovieComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private seoFriendlyService = inject(SeoFriendlyService);
  movieDetail = signal<DetailMovieResponse | null>(null);
  movieKeywords = signal<Keyword[]>([]);
  movieTrailer = signal<Trailer[]>([]);
  moviesRecomended = signal<Movie[]>([]);
  moviesSimilars = signal<Movie[]>([]);
  movieCollection = signal<Movie[]>([]);
  idMovie = signal<number | null>(null);
  errorMovie = signal<boolean>(false);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idSlug = params.get('id-slug') || '';
      this.idMovie.set(+idSlug.split('-')[0]);
      window.scrollTo({ top: 0 });
      const id = this.idMovie();
      if(!id) {
        this.errorMovie.set(true);
        return;
      }
      this.movieDetail.set(null);
      this.getMovieById(id);
      this.getMovieKeywords(id);
      this.getMovieTrailer(id);
      this.getMoviesRecommendations(id);
      this.getMoviesSimilars(id);
    });
  };

  getMovieById(id: number) {
    this.tmdbService.getMovieById(id)
      .pipe(
        tap(detailMovie => {
          const movieYear = detailMovie.release_date.toString().split('-')[0];
          this.seoFriendlyService.setMetaTags(`${detailMovie.title} (${movieYear})`, `Detalles, sinopsis, reparto y más sobre la película ${detailMovie.title}.`,
          `${environment.imageUrl}${detailMovie.backdrop_path}`)
        }))
      .subscribe({
          next: detailMovie => {
                  this.movieDetail.set(detailMovie);
                  this.movieCollection.set([]);
                  if(detailMovie.belongs_to_collection) {
                    const {id} = detailMovie.belongs_to_collection;
                    this.getMovieCollection(id);
                  }
                },
          error: () => this.errorMovie.set(true)
      });
  };

  getMovieKeywords(id: number) {
    this.tmdbService.getMovieKeywords(id)
      .subscribe(movieKeywords => this.movieKeywords.set(movieKeywords));
  };

  getMovieTrailer(id: number) {
    this.tmdbService.getMovieTrailers(id)
      .subscribe(trailer => this.movieTrailer.set(trailer));
  }

  getMoviesRecommendations(id: number) {
    this.tmdbService.getMovieRecommendations(id, 1)
      .pipe(map(({results}) => results))
      .subscribe(results => this.moviesRecomended.set(results));
  }

  getMoviesSimilars(id: number) {
    this.tmdbService.getMovieSimilar(id, 1)
      .pipe(map(({results}) => results))
      .subscribe(results => this.moviesSimilars.set(results));
  }

  getMovieCollection(idCollection: number) {
    this.tmdbService.getMovieCollectionById(idCollection)
      .pipe(map(({parts}) => parts))
      .subscribe(parts => this.movieCollection.set(parts));
  };
};
