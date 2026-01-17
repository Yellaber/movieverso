import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _, TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { BannerDetailSkeleton } from './components/banner-detail-skeleton/banner-detail-skeleton';
import { SideDetailSkeleton } from './components/side-detail-skeleton/side-detail-skeleton';
import { CarouselMoviesSkeleton } from '@components/carousel-movies-skeleton/carousel-movies-skeleton';
import { environment } from '@environments/environment';
import { ScrollService, SeoFriendlyService, TmdbService } from '@services';
import { InfoMovie } from './components/info-movie/info-movie';

@Component({
  imports: [ InfoMovie, BannerDetailSkeleton, SideDetailSkeleton, CarouselMoviesSkeleton ],
  templateUrl: './detail-movie.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DetailMovie implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private seoFriendlyService = inject(SeoFriendlyService);
  private translateService = inject(TranslateService);
  private scrollService = inject(ScrollService);
  private idMovie = signal<number | undefined>(undefined);
  movieSelected = rxResource({
    params: this.idMovie,
    stream: ({ params }) => this.tmdbService.getDetailMovieById(params)
      .pipe(
        tap(detailMovie => {
          const movieYear = detailMovie.release_date.toString().split('-')[0];
          this.loadMetaTags(detailMovie.title, movieYear, detailMovie.backdrop_path);
        }))
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idSlug = params.get('id-slug') || '';
      this.idMovie.set(+idSlug.split('-')[0]);
      this.scrollService.scrollTop();
    });
  }

  private loadMetaTags(movieTitle: string, movieYear: string, movieBackdropPath: string) {
    this.translateService.get(_('detailMovie.metaTags.description'), { title: movieTitle })
      .subscribe((description: string) =>
        this.seoFriendlyService.setMetaTags(`${ movieTitle } (${ movieYear })`, description, `${ environment.imageUrl }${ movieBackdropPath }`)
    );
  }
}
