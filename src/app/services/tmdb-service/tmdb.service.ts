import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.developments';
import { Genre, GenreMoviesResponse } from '../../interfaces/genre-movies-response.interface';
import { Movie, MovieResponse } from '../../interfaces/movie-response.interface';
import { DetailMovieResponse } from '../../interfaces/detail-movie-response.interface';
import { Cast, MovieCreditResponse } from '../../interfaces/movie-credit-response.interface';
import { MovieTrailerResponse, Trailer } from '../../interfaces/movie-trailer-response.interface';
import { MovieWatchProviderResponse } from '../../interfaces/movie-watch-provider-response.interface';
import { Keyword, MovieKeywordResponse } from '../../interfaces/movie-keyword-response';

const language = 'es';

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
        language,
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
        language,
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
        language
      }
    });
  }

  getMovieCredits(movieId: number): Observable<Cast[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/credits`;
    return this.httpClient.get<MovieCreditResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language
      }
    }).pipe(
      map(({ cast }) => cast)
    );
  }

  getMovieRecommendations(movieId: number, page: number): Observable<MovieResponse[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/recommendations`;
    return this.httpClient.get<MovieResponse[]>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language,
        page
      }
    });
  }

  getMovieSimilar(movieId: number, page: number): Observable<MovieResponse[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/similar`;
    return this.httpClient.get<MovieResponse[]>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language,
        page
      }
    });
  }

  getMovieTrailers(movieId: number): Observable<Trailer[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/videos`;
    return this.httpClient.get<MovieTrailerResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language
      }
    }).pipe(
      map(({ trailers }) => trailers)
    );
  }

  getMovieWatchProviders(movieId: number): Observable<MovieWatchProviderResponse> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/watch/providers`;
    return this.httpClient.get<MovieWatchProviderResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey
      }
    });
  }

  getMovieKeywords(movieId: number): Observable<Keyword[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/keywords`;
    return this.httpClient.get<MovieKeywordResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey
      }
    }).pipe(
      map(({ keywords }) => keywords)
    );
  }
}
