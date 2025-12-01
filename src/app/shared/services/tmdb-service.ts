import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { UserGeolocationService } from './user-geolocation-service';
import { Movie, PaginatedMovies, Genre, GenreMovies, DetailMovie } from '@interfaces';

type TypeQuery = DetailMovie | PaginatedMovies[] | Movie[] | Genre[];
interface Params {
  api_key: string;
  language: string;
  region?: string;
  page?: number
};

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private userGeolocationService = inject(UserGeolocationService);
  private httpClient = inject(HttpClient);
  private params: Params;
  private cacheQuery = new Map<string, TypeQuery>();
  private paginatedMovies: PaginatedMovies[] = [];
  private userGeolocation = this.userGeolocationService.getUserGeolocation;
  private userLanguage = computed<string>(() => {
    const userGeolocation = this.userGeolocation();
    return userGeolocation? userGeolocation.country_metadata.languages[0]: '';
  });
  private userCountry = computed<string>(() => {
    const userGeolocation = this.userGeolocation();
    return userGeolocation? userGeolocation.location.country_code2: '';
  });

  constructor() {
    this.params = {
      api_key: environment.tmdbApiKey,
      language: this.userLanguage(),
      region: this.userCountry(),
      page: 0
    };
  };

  private getPaginatedMovies(url: string, params: Params): Observable<PaginatedMovies[]> {
    if(params.page! <= 0) { return of([]); }
    if(params.page === 1) {
      if(this.cacheQuery.has(url)) {
        this.paginatedMovies = <PaginatedMovies[]>this.cacheQuery.get(url);
        return of(this.paginatedMovies);
      }
      this.paginatedMovies = [];
    }
    if(params.page! > this.paginatedMovies.length) {
      return this.httpClient.get<PaginatedMovies>(url, {
        params: { ...params }
      }).pipe(
        map(movieResponse => {
          this.paginatedMovies = [ ...this.paginatedMovies, movieResponse ];
          return this.paginatedMovies;
        }),
        tap(moviesResponse => this.cacheQuery.set(url, moviesResponse))
      );
    }
    return of(this.paginatedMovies);
  };

  getPaginatedMoviesByCategory(category: string, page: number = 1): Observable<PaginatedMovies[]> {
    const url = `${environment.tmdbApiUrl}/${category}`;
    const { api_key, language, region } = this.params;
    return this.getPaginatedMovies(url, { api_key, language, region, page });
  };

  getPaginatedMoviesBasedIn(basedIn: string, movieId: number, page: number = 1): Observable<PaginatedMovies[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}`;
    const { api_key, language } = this.params;
    return this.getPaginatedMovies(url, { api_key, language, page });
  };

  getGenresMovie(): Observable<Genre[]> {
    const url = `${environment.tmdbApiUrl}/genre/movie/list`;
    if(this.cacheQuery.has(url)) {
      return of(<Genre[]>this.cacheQuery.get(url));
    }
    const { api_key, language } = this.params;
    return this.httpClient.get<GenreMovies>(url, {
      params: { api_key, language }
    }).pipe(
      map(genreMovies => genreMovies.genres),
      map(genres => genres.sort((genre1, genre2) => {
        if(genre1.name > genre2.name) { return 1; }
        if(genre1.name < genre2.name) { return -1; }
        return 0;
      })),
      tap(genres => this.cacheQuery.set(url, genres))
    );
  };

  getGenresMovieByIds(genreIds: number[]): Observable<Genre[]> {
    const key = `${environment.tmdbApiUrl}/genre/movie/list/ids=${genreIds.toString()}`;
    if(this.cacheQuery.has(key)) {
      return of(<Genre[]>this.cacheQuery.get(key));
    }
    return this.getGenresMovie().pipe(
      map(genres => genres.filter(genre => genreIds.includes(genre.id))),
      tap(genres => this.cacheQuery.set(key, genres))
    );
  };

  getDetailMovieById(id: number): Observable<DetailMovie> {
    const url = `${environment.tmdbApiUrl}/movie/${id}`;
    if(this.cacheQuery.has(url)) {
      return of(<DetailMovie>this.cacheQuery.get(url));
    }
    const { api_key, language } = this.params;
    return this.httpClient.get<DetailMovie>(url, {
      params: { api_key, language }
    }).pipe(tap(detailMovie => this.cacheQuery.set(url, detailMovie)));
  };
}
