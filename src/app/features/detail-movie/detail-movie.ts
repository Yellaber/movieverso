import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Categories } from '@components/categories/categories';
import { BannerDetail } from './components/banner-detail/banner-detail';
import { SideDetail } from './components/side-detail/side-detail';
import { BannerDetailSkeleton } from './components/banner-detail-skeleton/banner-detail-skeleton';
import { SideDetailSkeleton } from './components/side-detail-skeleton/side-detail-skeleton';
import { CarouselMoviesSkeleton } from '@components/carousel-movies-skeleton/carousel-movies-skeleton';
import { MovieList } from './components/movie-list/movie-list';
import { Notification } from '@components/notification/notification';
import { Trailer } from './components/trailer/trailer';
import { environment } from '@environments/environment';
import { ScrollService, TmdbService } from '@services';
import { SeoFriendlyService } from '@services';

const menuItems = [ 'upcoming', 'now-playing', 'popular', 'top-rated', 'trending' ];

@Component({
  imports: [
    FontAwesomeModule,
    Categories,
    BannerDetail,
    SideDetail,
    BannerDetailSkeleton,
    SideDetailSkeleton,
    MovieList,
    Notification,
    CarouselMoviesSkeleton,
    Trailer,
    TranslatePipe
  ],
  templateUrl: './detail-movie.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DetailMovie implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private seoFriendlyService = inject(SeoFriendlyService);
  private translateService = inject(TranslateService);
  private scrollService = inject(ScrollService);
  menuItems = signal<string[]>([]);
  idMovie = signal<number | undefined>(undefined);
  movieSelected = rxResource({
    params: this.idMovie,
    stream: ({ params }) => this.tmdbService.getDetailMovieById(params)
      .pipe(
        tap(detailMovie => {
          const movieYear = detailMovie.release_date.toString().split('-')[0];
          this.loadMetaTags(detailMovie.title, movieYear, detailMovie.backdrop_path);
        }))
  });
  idCollection = computed<number | undefined>(() =>
    (this.movieSelected.hasValue() && this.movieSelected.value().belongs_to_collection)?
    this.movieSelected.value().belongs_to_collection.id: undefined
  );

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.menuItems.set(menuItems);
      const idSlug = params.get('id-slug') || '';
      this.idMovie.set(+idSlug.split('-')[0]);
      this.scrollService.scrollTop();
    });
  }

  private loadMetaTags(movieTitle: string, movieYear: string, movieBackdropPath: string) {
    this.translateService.get(_('detailMovie.metaTags.description'), { title: movieTitle })
      .subscribe((description: string) =>
        this.seoFriendlyService.setMetaTags(`${movieTitle} (${movieYear})`, description,
          `${environment.imageUrl}${movieBackdropPath}`)
    );
  }
}
