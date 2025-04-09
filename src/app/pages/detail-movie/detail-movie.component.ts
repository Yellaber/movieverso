import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { TmdbService } from '../../services/tmdb-service/tmdb.service';
import { DetailMovieResponse } from '../../interfaces/detail-movie-response.interface';
import { environment } from '../../environments/environment.developments';
import { TagComponent } from "../../shared/tag/tag.component";
import { BadgeListComponent } from '../../shared/badge-list/bandge-list.component';
import { PopularityComponent } from '../../shared/popularity/popularity.component';
import { VoteComponent } from '../../shared/vote/vote.component';
import { Keyword } from '../../interfaces/movie-keyword-response';

const flagCdnUrl = 'https://flagcdn.com/w80/';

@Component({
  imports: [
    JsonPipe,
    CurrencyPipe,
    TagComponent,
    FontAwesomeModule,
    BadgeListComponent,
    PopularityComponent,
    VoteComponent,
],
  templateUrl: './detail-movie.component.html'
})
export default class DetailMovieComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  faBookmark = faBookmark;
  faHeart = faHeart;
  faThumbsUp = faThumbsUp;
  movie = signal<DetailMovieResponse>(Object.create({}));
  movieKeywords = signal<Keyword[]>([]);
  posterImage = computed(() => environment.imageUrl + this.movie().poster_path);
  backdropImage = computed(() => environment.imageUrl + this.movie().backdrop_path);
  flagCountry = computed(() =>
    flagCdnUrl + this.movie().production_countries[0].iso_3166_1.toLowerCase() + '.png'
  );

  ngOnInit(): void {
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
      .subscribe(detailMovie => this.movie.set(detailMovie));
  }

  getMovieKeywords(id: number) {
    return this.tmdbService.getMovieKeywords(id)
      .subscribe(movieKeywords => this.movieKeywords.set(movieKeywords));
  }
}
