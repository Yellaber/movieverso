import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '@environments/environment.developments';
import { UserGeolocationService } from '@app/core/services';
import { MovieResponse, QueryParams } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private userGeolocationService = inject(UserGeolocationService);
  private httpClient = inject(HttpClient);
  private moviesFiltered: MovieResponse[] = [];
  private userLanguage = signal<string>('');
  private userCountry = signal<string>('');

  constructor() {
    const userGeolocation = this.userGeolocationService.getUserGeolocation();
    if(userGeolocation) {
      const { country_metadata, location } = userGeolocation;
      this.userLanguage.set(country_metadata.languages[0]);
      this.userCountry.set(location.country_code2);
    }
  };

  getMovieByTitle(query: string, page: number): Observable<MovieResponse[]> {
    if(page === 1) {
      this.moviesFiltered = [];
    }
    const url = `${environment.tmdbApiUrl}/search/movie`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        query,
        language: this.userLanguage(),
        region: this.userCountry(),
        page
      }
    }).pipe(
        map(movieResponse => {
          this.moviesFiltered = [ ...this.moviesFiltered, movieResponse ];
          return this.moviesFiltered;
        })
      );
  };

  getMoviesFiltered(queryParams: QueryParams, page: number): Observable<MovieResponse[]> {
    if(page === 1) {
      this.moviesFiltered = [];
    }
    const url = `${environment.tmdbApiUrl}/discover/movie`;
    const params = this.getHttpParamsCommons(queryParams, page);
    return this.httpClient.get<MovieResponse>(url, { params })
      .pipe(
        map(movieResponse => {
          this.moviesFiltered = [ ...this.moviesFiltered, movieResponse ];
          return this.moviesFiltered;
        })
      );
  };

  private getHttpParamsCommons(queryParams: QueryParams, page: number): HttpParams {
    const params = new HttpParams()
    .set('api_key', environment.tmdbApiKey)
    .set('include_adult', false)
    .set('include_video', false)
    .set('language', this.userLanguage())
    .set('region', this.userCountry())
    .set('page', page)
    .set('sort_by', queryParams.sortBy ?? '')
    .set('primary_release_date.gte', queryParams.primaryReleaseDateGte ?? '')
    .set('primary_release_date.lte', queryParams.primaryReleaseDateLte ?? '')
    .set('with_genres', queryParams.withGenres ?? '')
    .set('vote_average.gte', queryParams.voteAverageGte ?? 0)
    .set('vote_count.gte', queryParams.voteCountGte ?? 0);
    return params;
  };
}
