import { HttpClient } from '@angular/common/http';
import { inject, Injectable, computed } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { UserGeolocationService } from '@services';
import { DetailMovie, Keyword, MovieCollection, MovieKeyword, PaginatedMovies, MovieCredit, MovieTrailer, Trailer } from '@interfaces';

type TypeQuery = DetailMovie | Keyword[] | MovieCredit | MovieCollection | PaginatedMovies | Trailer[];

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private userGeolocationService = inject(UserGeolocationService);
  private httpClient = inject(HttpClient);
  private cacheQuery = new Map<string, TypeQuery>();
  private userGeolocation = this.userGeolocationService.getUserGeolocation;
  private userLanguage = computed<string>(() => {
    const userGeolocation = this.userGeolocation();
    return userGeolocation? userGeolocation.country_metadata.languages[0]: '';
  });

  getMovieKeywords(movieId: number): Observable<Keyword[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/keywords`;
    if(this.cacheQuery.has(url)) {
      return of(<Keyword[]>this.cacheQuery.get(url));
    }
    return this.httpClient.get<MovieKeyword>(url, {
      params: { api_key: environment.tmdbApiKey }
    })
    .pipe(
      map(({ keywords }) => keywords),
      tap(results => this.cacheQuery.set(url, results))
    );
  }

  getMovieTrailers(movieId: number): Observable<Trailer[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/videos`;
    if(this.cacheQuery.has(url)) {
      return of(<Trailer[]>this.cacheQuery.get(url));
    }
    return this.httpClient.get<MovieTrailer>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage(),
      }
    })
    .pipe(
      map(({ results }) => results),
      tap(results => this.cacheQuery.set(url, results))
    );
  }

  getMovieCredits(movieId: number): Observable<MovieCredit> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/credits`;
    if(this.cacheQuery.has(url)) {
      return of(<MovieCredit>this.cacheQuery.get(url));
    }
    return this.httpClient.get<MovieCredit>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage(),
      }
    }).pipe(tap(movieCredits => this.cacheQuery.set(url, movieCredits)));
  }

  getRelatedMovies(relation: string, movieId: number, page: number = 1): Observable<PaginatedMovies> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/${relation}`;
    if(this.cacheQuery.has(url)) {
      return of(<PaginatedMovies>this.cacheQuery.get(url));
    }
    return this.httpClient.get<PaginatedMovies>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage(),
        page
      }
    }).pipe(tap(relatedMovie => this.cacheQuery.set(url, relatedMovie)));
  }

  getMovieCollectionById(id: number): Observable<MovieCollection> {
    const url = `${environment.tmdbApiUrl}/collection/${id}`;
    if(this.cacheQuery.has(url)) {
      return of(<MovieCollection>this.cacheQuery.get(url));
    }
    return this.httpClient.get<MovieCollection>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage(),
      }
    }).pipe(tap(movieCollection => this.cacheQuery.set(url, movieCollection)));
  }
}
