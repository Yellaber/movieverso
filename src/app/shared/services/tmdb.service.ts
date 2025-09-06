import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment.developments';
import { UserGeolocationService } from '../../core/services/user-geolocation.service';
import { Movie, MovieResponse, Genre, GenreMoviesResponse, DetailMovieResponse } from '@shared/interfaces';

type TypeQuery = DetailMovieResponse | MovieResponse[] | Movie[] | Genre[];
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
  private moviesResponse: MovieResponse[] = [];
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

  private getMovies(url: string, page: number, params: Params): Observable<MovieResponse[]> {
    if(page <= 0) { return of([]); }
    if(page === 1) {
      if(this.cacheQuery.has(url)) {
        this.moviesResponse = <MovieResponse[]>this.cacheQuery.get(url);
        return of(this.moviesResponse);
      }
      this.moviesResponse = [];
    }
    if(page > this.moviesResponse.length) {
      return this.httpClient.get<MovieResponse>(url, {
        params: { ...params }
      }).pipe(
        map(movieResponse => {
          this.moviesResponse = [ ...this.moviesResponse, movieResponse ];
          return this.moviesResponse;
        }),
        tap(moviesResponse => this.cacheQuery.set(url, moviesResponse))
      );
    }
    return of(this.moviesResponse);
  };

  getMoviesFilteredByCategory(category: string, page: number): Observable<MovieResponse[]> {
    const url = `${environment.tmdbApiUrl}/${category}`;
    const { api_key, language, region } = this.params;
    return this.getMovies(url, page, { api_key, language, region, page });
  };

  getMoviesBasedIn(basedIn: string, movieId: number, page: number): Observable<MovieResponse[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}`;
    const { api_key, language } = this.params;
    return this.getMovies(url, page, { api_key, language, page });
  };

  getGenreMovieList(): Observable<Genre[]> {
    const url = `${environment.tmdbApiUrl}/genre/movie/list`;
    if(this.cacheQuery.has(url)) {
      return of(<Genre[]>this.cacheQuery.get(url));
    }
    const { api_key, language } = this.params;
    return this.httpClient.get<GenreMoviesResponse>(url, {
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

  getGenreMovieListByIds(genreIds: number[]): Observable<Genre[]> {
    const key = `${environment.tmdbApiUrl}/genre/movie/list/ids=${genreIds.toString()}`;
    if(this.cacheQuery.has(key)) {
      return of(<Genre[]>this.cacheQuery.get(key));
    }
    return this.getGenreMovieList().pipe(
      map(genres => genres.filter(genre => genreIds.includes(genre.id))),
      tap(genres => this.cacheQuery.set(key, genres))
    );
  };

  getMovieById(id: number): Observable<DetailMovieResponse> {
    const url = `${environment.tmdbApiUrl}/movie/${id}`;
    if(this.cacheQuery.has(url)) {
      return of(<DetailMovieResponse>this.cacheQuery.get(url));
    }
    const { api_key, language } = this.params;
    return this.httpClient.get<DetailMovieResponse>(url, {
      params: { api_key, language }
    }).pipe(tap(detailMovie => this.cacheQuery.set(url, detailMovie)));
  };
};

