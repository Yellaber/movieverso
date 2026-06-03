import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { UserGeolocationService, CacheService } from '@services';
import { DetailMovie, Keyword, MovieCollection, MovieKeyword, PaginatedMovies, MovieCredit, MovieTrailer, Trailer } from '@interfaces';

const TTL_DETAIL = 1_800_000; // 30 min

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private userGeolocationService = inject(UserGeolocationService);
  private httpClient = inject(HttpClient);
  private cacheService = inject(CacheService);

  getMovieKeywords(movieId: number): Observable<Keyword[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/keywords`;
    const cached = this.cacheService.get<Keyword[]>(url);
    if(cached !== null) return of(cached);
    return this.httpClient.get<MovieKeyword>(url, {
      params: { api_key: environment.tmdbApiKey }
    })
    .pipe(
      map(({ keywords }) => keywords),
      tap(results => this.cacheService.set(url, results, TTL_DETAIL))
    );
  }

  getMovieTrailers(movieId: number): Observable<Trailer[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/videos`;
    const cached = this.cacheService.get<Trailer[]>(url);
    if(cached !== null) return of(cached);
    return this.httpClient.get<MovieTrailer>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userGeolocationService.userLanguage(),
      }
    })
    .pipe(
      map(({ results }) => results),
      tap(results => this.cacheService.set(url, results, TTL_DETAIL))
    );
  }

  getMovieCredits(movieId: number): Observable<MovieCredit> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/credits`;
    const cached = this.cacheService.get<MovieCredit>(url);
    if(cached !== null) return of(cached);
    return this.httpClient.get<MovieCredit>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userGeolocationService.userLanguage(),
      }
    }).pipe(tap(movieCredits => this.cacheService.set(url, movieCredits, TTL_DETAIL)));
  }

  getRelatedMovies(relation: string, movieId: number, page: number = 1): Observable<PaginatedMovies> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/${relation}`;
    const cached = this.cacheService.get<PaginatedMovies>(url);
    if(cached !== null) return of(cached);
    return this.httpClient.get<PaginatedMovies>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userGeolocationService.userLanguage(),
        page
      }
    }).pipe(tap(relatedMovie => this.cacheService.set(url, relatedMovie, TTL_DETAIL)));
  }

  getMovieCollectionById(id: number): Observable<MovieCollection> {
    const url = `${environment.tmdbApiUrl}/collection/${id}`;
    const cached = this.cacheService.get<MovieCollection>(url);
    if(cached !== null) return of(cached);
    return this.httpClient.get<MovieCollection>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userGeolocationService.userLanguage(),
      }
    }).pipe(tap(movieCollection => this.cacheService.set(url, movieCollection, TTL_DETAIL)));
  }
}
