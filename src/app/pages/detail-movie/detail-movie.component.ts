import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TmdbService } from '../../services/tmdb-service/tmdb.service';
import { DetailMovieResponse } from '../../interfaces/detail-movie-response.interface';
import { BadgeListComponent } from '../../shared/badge-list/bandge-list.component';
import { Keyword } from '../../interfaces/movie-keyword-response';
import { BannerDetailComponent } from '../../components/banner-detail/banner-detail.component';
import { SeoFriendlyService } from '../../services/seo-friendly/SeoFriendly.service';

const flagCdnUrl = 'https://flagcdn.com/w80/';

@Component({
  selector: 'detail-movie',
  imports: [
    JsonPipe,
    CurrencyPipe,
    FontAwesomeModule,
    BadgeListComponent,
    BannerDetailComponent
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

  ngOnInit(): void {
    this.seoFriendlyService.setMetaTags('Detail', 'Esta es la página que muestrala información de cada película');
    this.route.paramMap.subscribe(params => {
      if(params.get('id')) {
        const idMovie = +params.get('id')!;
        this.getMovieById(idMovie);
        this.getMovieKeywords(idMovie);
      }
    });
  }

  getMovieById(id: number) {
    return this.tmdbService.getMovieById(id)
      .subscribe(detailMovie => this.movieDetail.set(detailMovie));
  }

  getMovieKeywords(id: number) {
    return this.tmdbService.getMovieKeywords(id)
      .subscribe(movieKeywords => this.movieKeywords.set(movieKeywords));
  }

  getFlagCountry(iso31661Code: string) {
    return flagCdnUrl + iso31661Code.toLowerCase() + '.png';
  }
}
