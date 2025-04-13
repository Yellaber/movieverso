import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailMovieResponse } from '../../interfaces/detail-movie-response.interface';
import { Keyword } from '../../interfaces/movie-keyword-response';
import { BannerDetailComponent } from '../../components/banner-detail/banner-detail.component';
import { SideDetailComponent } from '../../components/side-detail/side-detail.component';
import { BannerDetailSkeletonComponent } from '../../components/banner-detail-skeleton/banner-detail-skeleton.component';
import { TmdbService } from '../../services/tmdb-service/tmdb.service';
import { SeoFriendlyService } from '../../services/seo-friendly/seo-friendly.service';
import { SideDetailSkeletonComponent } from '../../components/side-detail-skeleton/side-detail-skeleton.component';
import { environment } from '../../environments/environment.developments';

const flagCdnUrl = 'https://flagcdn.com/w80/';

@Component({
  selector: 'detail-movie',
  imports: [
    JsonPipe,
    FontAwesomeModule,
    BannerDetailComponent,
    SideDetailComponent,
    BannerDetailSkeletonComponent,
    SideDetailSkeletonComponent
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
  idMovie = toSignal<number>(
              this.route.paramMap
                .pipe(
                  map(params => params.get('id')?? ''),
                  map(id => isNaN(+id)? 0: +id)
                )
              );
  errorMovie = signal<boolean>(false);

  ngOnInit(): void {
    this.getMovieById();
    this.getMovieKeywords();
  }

  getMovieById() {
    this.tmdbService.getMovieById(this.idMovie()!)
      .pipe(
        tap(detailMovie =>
          this.seoFriendlyService.setMetaTags(`${ detailMovie.title }`, `Esta página muestra la información de ${ detailMovie.title }.`, `${ environment.imageUrl }${ detailMovie.backdrop_path }`)
        ))
      .subscribe({
          next: detailMovie => this.movieDetail.set(detailMovie),
          error: () => this.errorMovie.set(true)
      });
  }

  getMovieKeywords() {
    this.tmdbService.getMovieKeywords(this.idMovie()!)
      .subscribe(movieKeywords => this.movieKeywords.set(movieKeywords));
  }

  getFlagCountry(iso31661Code: string) {
    return flagCdnUrl + iso31661Code.toLowerCase() + '.png';
  }
}
