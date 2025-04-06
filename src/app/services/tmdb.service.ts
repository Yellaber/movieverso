import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from '../environments/environment.developments';
import { Genre, GenreMoviesResponse } from '../interfaces/genre-movies-response.interface';
import { Movie, MovieResponse } from '../interfaces/movie-response.interface';
import { DetailMovieResponse } from '../interfaces/detail-movie-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private httpClient = inject(HttpClient);

  getGenreMovieList(): Observable<Genre[]> {
    const url = `${ environment.tmdbApiUrl }/genre/movie/list`;
    return this.httpClient.get<GenreMoviesResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: 'es'
      }
    }).pipe(
      map(({ genres }) => genres)
    );
  }

  getPopularMovies(limit?: number): Observable<Movie[]> {
    const url = `${ environment.tmdbApiUrl }/movie/popular`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: 'es',
        page: 1
      }
    }).pipe(
      map(({ results }) => limit? results.slice(0, limit): results)
    );
  }

  getTopRatedMovies(limit?: number): Observable<Movie[]> {
    const url = `${ environment.tmdbApiUrl }/movie/top_rated`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: 'es',
        page: 1
      }
    }).pipe(
      map(({ results }) => limit? results.slice(0, limit): results)
    );
  }

  getMovieById(id: number): Observable<DetailMovieResponse> {
    const url = `${ environment.tmdbApiUrl }/movie/${ id }`;
    return this.httpClient.get<DetailMovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: 'es'
      }
    });
  }
}
