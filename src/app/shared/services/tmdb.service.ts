import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment.developments';
import { UserGeolocationService } from '../../core/services/user-geolocation.service';
import { Movie, MovieResponse, Genre, GenreMoviesResponse, DetailMovieResponse, UserGeolocation } from '@shared/interfaces';

type TypeQuery = DetailMovieResponse | MovieResponse | Movie[] | Genre[];

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private userGeolocationService = inject(UserGeolocationService);
  private httpClient = inject(HttpClient);
  private cacheQuery = new Map<string, TypeQuery>();
  private moviesFiltered: MovieResponse[] = [];
  private userGeolocation = this.userGeolocationService.getUserGeolocation;
  private userLanguage = computed<string>(() => {
    const userGeolocation = this.userGeolocation();
    return userGeolocation? userGeolocation.country_metadata.languages[0]: '';
  });
  private userCountry = computed<string>(() => {
    const userGeolocation = this.userGeolocation();
    return userGeolocation? userGeolocation.location.country_code2: '';
  });

  getMoviesFilteredByCategory(category: string, page: number): Observable<MovieResponse[]> {
    if(page <= 0) { return of([]); }
    if(page === 1) { this.moviesFiltered = []; }
    const url = `${environment.tmdbApiUrl}/${category}`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
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

  getGenreMovieListByIds(genreIds: number[]): Observable<Genre[]> {
    const url = `${environment.tmdbApiUrl}/genre/movie/list`;
    const key = `${url}/ids=${genreIds.toString()}`;
    if(this.cacheQuery.has(key)) {
      return of(<Genre[]>this.cacheQuery.get(key));
    }
    return this.httpClient.get<GenreMoviesResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage()
      }
    }).pipe(
      map(genreMovies => genreMovies.genres.filter(genre => genreIds.includes(genre.id))),
      tap(genreMovies => this.cacheQuery.set(key, genreMovies))
    );
  };

  getGenreMovieList(): Observable<Genre[]> {
    const url = `${environment.tmdbApiUrl}/genre/movie/list`;
    if(this.cacheQuery.has(url)) {
      return of(<Genre[]>this.cacheQuery.get(url));
    }
    return this.httpClient.get<GenreMoviesResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage()
      }
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

  getMovieById(id: number): Observable<DetailMovieResponse> {
    const url = `${environment.tmdbApiUrl}/movie/${id}`;
    if(this.cacheQuery.has(url)) {
      return of(<DetailMovieResponse>this.cacheQuery.get(url));
    }
    return this.httpClient.get<DetailMovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage()
      }
    }).pipe(tap(detailMovie => this.cacheQuery.set(url, detailMovie)));
  };

  getMoviesBasedIn(basedIn: string, movieId: number, page: number): Observable<MovieResponse[]> {
    if(page <= 0) { return of([]); }
    if(page === 1) { this.moviesFiltered = []; }
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage(),
        page
      }
    }).pipe(
      map(movieResponse => {
        this.moviesFiltered = [ ...this.moviesFiltered, movieResponse ];
        return this.moviesFiltered;
      })
    );
  };
};
