import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerDetailComponent } from '@components/banner-detail/banner-detail.component';
import { SideDetailComponent } from '@components/side-detail/side-detail.component';
import { BannerDetailSkeletonComponent } from '@components/banner-detail-skeleton/banner-detail-skeleton.component';
import { SideDetailSkeletonComponent } from '@components/side-detail-skeleton/side-detail-skeleton.component';
import { MoviesDetailComponent } from '@components/movies-detail/movies-detail.component';
import { environment } from '@environments/environment.developments';
import { TmdbService, SeoFriendlyService } from '@services/';
import { DetailMovieResponse, Keyword } from '@interfaces/';

@Component({
  imports: [
    JsonPipe,
    FontAwesomeModule,
    BannerDetailComponent,
    SideDetailComponent,
    BannerDetailSkeletonComponent,
    SideDetailSkeletonComponent,
    MoviesDetailComponent
  ],
  templateUrl: './detail-movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DetailMovieComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private seoFriendlyService = inject(SeoFriendlyService);
  movieDetail = signal<DetailMovieResponse>(Object.create({}));
  movieKeywords = signal<Keyword[]>([]);
  idMovie = signal<number>(0);
  errorMovie = signal<boolean>(false);

  ngOnInit(): void {
    const idSlug = this.route.snapshot.paramMap.get('id-slug') || '';
    this.idMovie.set(+idSlug.split('-')[0]);
    this.getMovieById();
    this.getMovieKeywords();
  }

  getMovieById() {
    this.tmdbService.getMovieById(this.idMovie())
      .pipe(
        tap(detailMovie => {
          const movieYear = detailMovie.release_date.toString().split('-')[0];
          this.seoFriendlyService.setMetaTags(`${detailMovie.title} (${movieYear})`, `Detalles, sinopsis, reparto y más sobre la película ${detailMovie.title}.`,
          `${environment.imageUrl}${detailMovie.backdrop_path}`)
        }))
      .subscribe({
          next: detailMovie => this.movieDetail.set(detailMovie),
          error: () => this.errorMovie.set(true)
      });
  }

  getMovieKeywords() {
    this.tmdbService.getMovieKeywords(this.idMovie())
      .subscribe(movieKeywords => this.movieKeywords.set(movieKeywords));
  }
}
