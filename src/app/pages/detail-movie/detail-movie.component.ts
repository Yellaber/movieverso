import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerDetailComponent } from './components/banner-detail/banner-detail.component';
import { SideDetailComponent } from './components/side-detail/side-detail.component';
import { BannerDetailSkeletonComponent } from './components/banner-detail-skeleton/banner-detail-skeleton.component';
import { SideDetailSkeletonComponent } from './components/side-detail-skeleton/side-detail-skeleton.component';
import { CarruselMoviesSkeletonComponent } from '@shared/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { YoutubeVideoComponent } from './components/youtube-video/youtube-video.component';
import { environment } from '@environments/environment.developments';
import { TmdbService, SeoFriendlyService, ScrollService } from '@services/';
import { CategoriesComponent } from "@app/shared/categories/categories.component";

const menuItems = ['upcoming', 'now-playing', 'popular', 'top-rated', 'trending'];

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
    YoutubeVideoComponent,
    CategoriesComponent
],
  templateUrl: './detail-movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DetailMovieComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private seoFriendlyService = inject(SeoFriendlyService);
  private scrollService = inject(ScrollService);
  menuItems = signal<string[]>([]);
  idMovie = signal<number | null>(null);
  movieSelected = rxResource({
    request: this.idMovie,
    loader: () => this.tmdbService.getMovieById(this.idMovie()!)
      .pipe(
        tap(detailMovie => {
          const movieYear = detailMovie.release_date.toString().split('-')[0];
          this.seoFriendlyService.setMetaTags(`${detailMovie.title} (${movieYear})`, `Detalles, sinopsis, reparto y más sobre la película ${detailMovie.title}.`,
          `${environment.imageUrl}${detailMovie.backdrop_path}`)
        }))
  });
  movieKeywords = rxResource({
    request: this.idMovie,
    loader: () => this.idMovie()? this.tmdbService.getMovieKeywords(this.idMovie()!): of([])
  });
  movieTrailer = rxResource({
    request: this.idMovie,
    loader: () => this.idMovie()? this.tmdbService.getMovieTrailers(this.idMovie()!): of([])
  });
  moviesRecomended = rxResource({
    request: this.idMovie,
    loader: () =>
      this.idMovie()? this.tmdbService.getMovieRecommendations(this.idMovie()!)
        .pipe(map(({results}) => results)): of([])
  });
  moviesSimilars = rxResource({
    request: this.idMovie,
    loader: () =>
      this.idMovie()? this.tmdbService.getMovieSimilar(this.idMovie()!)
        .pipe(map(({results}) => results)): of([])
  });
  idCollection = computed<number | undefined>(() =>
    (this.movieSelected.hasValue() && this.movieSelected.value().belongs_to_collection)?
      this.movieSelected.value().belongs_to_collection.id: undefined
  );
  movieCollection = rxResource({
    request: this.idCollection,
    loader: () =>
      this.idCollection()? this.tmdbService.getMovieCollectionById(this.idCollection()!)
        .pipe(map(({parts}) => parts)): of([])
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.menuItems.set(menuItems);
      const idSlug = params.get('id-slug') || '';
      this.idMovie.set(+idSlug.split('-')[0]);
      this.scrollService.scrollTop();
    });
  };
};
