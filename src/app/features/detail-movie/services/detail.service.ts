import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment.developments';
import { UserGeolocationService } from '@app/core/services';
import { DetailMovieResponse, Keyword, MovieCollectionResponse, MovieKeywordResponse, MovieResponse, MovieTrailerResponse, Trailer } from '@shared/interfaces';

type TypeQuery = DetailMovieResponse | MovieResponse | MovieCollectionResponse | Trailer[] | Keyword[];

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private userGeolocationService = inject(UserGeolocationService);
  private httpClient = inject(HttpClient);
  private cacheQuery = new Map<string, TypeQuery>();
  private userGeolocation = this.userGeolocationService.getUserGeolocation;
  private userLanguage = signal<string>('');

  constructor() {
    this.userLanguage.set(this.userGeolocation()?.country_metadata.languages[0]!);
  };

  getMovieKeywords(movieId: number): Observable<Keyword[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/keywords`;
    if(this.cacheQuery.has(url)) {
      return of(<Keyword[]>this.cacheQuery.get(url));
    }
    return this.httpClient.get<MovieKeywordResponse>(url, {
      params: { api_key: environment.tmdbApiKey }
    }).pipe(
        map(({ keywords }) => keywords),
        tap(results => this.cacheQuery.set(url, results))
      );
  };

  getMovieTrailers(movieId: number): Observable<Trailer[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/videos`;
    if(this.cacheQuery.has(url)) {
      return of(<Trailer[]>this.cacheQuery.get(url));
    }
    return this.httpClient.get<MovieTrailerResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage(),
      }
    }).pipe(
        map(({ results }) => results),
        tap(results => this.cacheQuery.set(url, results))
      );
  };

  getRelationedMovies(relation: string, movieId: number, page: number = 1): Observable<MovieResponse> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/${relation}`;
    if(this.cacheQuery.has(url)) {
      return of(<MovieResponse>this.cacheQuery.get(url));
    }
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage(),
        page
      }
    }).pipe(tap(movieSimilars => this.cacheQuery.set(url, movieSimilars)));
  };

  getMovieCollectionById(id: number): Observable<MovieCollectionResponse> {
    const url = `${environment.tmdbApiUrl}/collection/${id}`;
    if(this.cacheQuery.has(url)) {
      return of(<MovieCollectionResponse>this.cacheQuery.get(url));
    }
    return this.httpClient.get<MovieCollectionResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage(),
      }
    }).pipe(tap(movieCollection => this.cacheQuery.set(url, movieCollection)));
  };
};
