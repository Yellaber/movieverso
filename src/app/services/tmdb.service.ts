import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map, Observable } from 'rxjs';
import { environment } from '@environments/environment.developments';
import { Movie, MovieResponse, Genre, GenreMoviesResponse, DetailMovieResponse,
         Cast, MovieCreditResponse, MovieTrailerResponse, Trailer, MovieWatchProviderResponse,
         Keyword, MovieKeywordResponse, UserGeolocation } from '@interfaces/';

const USER_LOCAL_LOCATION = 'userLocalLocation';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private httpClient = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  userLocation = signal<UserGeolocation>(Object.create({}));
  userLanguage = '';

  constructor() {
    isPlatformBrowser(this.platformId) && this.initUserLocation();
  };

  initUserLocation() {
    const userLocalLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocalLocation) {
      this.userLocation.set(JSON.parse(userLocalLocation));
    } else {
      this.getUserLocation()
        .subscribe(geolocation => {
          this.userLocation.set(geolocation);
          localStorage.setItem(USER_LOCAL_LOCATION, JSON.stringify(geolocation))
        });
    }
    this.userLanguage = this.getUserLanguage();
  };

  getUserLanguage() {
    return this.userLocation().languages.includes(',')?
           this.userLocation().languages.split(',')[0]: this.userLocation().languages
  };

  getUserLocation(): Observable<UserGeolocation> {
    return this.httpClient.get<UserGeolocation>('https://ipapi.co/json/');
  };

  getUpcommingMovies(limit?: number, page: number = 1): Observable<Movie[]> {
    const currentDate = new Date();
    const url = `${ environment.tmdbApiUrl }/movie/upcoming`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    }).pipe(
      map(({ results }) => limit? results.slice(0, limit): results),
      map(movies => movies.sort((movie1, movie2) => {
        const dateMovie1 = new Date(movie1.release_date);
        const dateMovie2 = new Date(movie2.release_date);
        return dateMovie1.getTime() - dateMovie2.getTime();
      })),
      map(movies => movies.filter(movie => {
        const dateMovie = new Date(movie.release_date);
        return (currentDate < dateMovie) && movie;
      }))
    );
  };

  getNowPlayingMovies(limit?: number, page: number = 1): Observable<Movie[]> {
    const url = `${ environment.tmdbApiUrl }/movie/now_playing`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    }).pipe(
      map(({ results }) => limit? results.slice(0, limit): results),
      map(movies => movies.sort((movie1, movie2) => {
        const dateMovie1 = new Date(movie1.release_date);
        const dateMovie2 = new Date(movie2.release_date);
        return dateMovie2.getTime() - dateMovie1.getTime();
      }))
    );
  };

  getPopularMovies(limit?: number, page: number = 1): Observable<Movie[]> {
    const url = `${ environment.tmdbApiUrl }/movie/popular`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    }).pipe( map(({ results }) => limit? results.slice(0, limit): results) );
  };

  getTopRatedMovies(limit?: number, page: number = 1): Observable<Movie[]> {
    const url = `${ environment.tmdbApiUrl }/movie/top_rated`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    }).pipe( map(({ results }) => limit? results.slice(0, limit): results) );
  };

  getTrendingMovies(limit?: number, page: number = 1): Observable<Movie[]> {
    const url = `${ environment.tmdbApiUrl }/trending/movie/day`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    }).pipe( map(({ results }) => limit? results.slice(0, limit): results) );
  };

  getGenreMovieList(genreIds: number[]): Observable<Genre[]> {
    const url = `${ environment.tmdbApiUrl }/genre/movie/list`;
    return this.httpClient.get<GenreMoviesResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe( map(({ genres }) => genres.filter( genre => genreIds.includes(genre.id) )) );
  };

  getMovieById(id: number): Observable<DetailMovieResponse> {
    const url = `${ environment.tmdbApiUrl }/movie/${ id }`;
    return this.httpClient.get<DetailMovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    });
  };

  getMovieCredits(movieId: number): Observable<Cast[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/credits`;
    return this.httpClient.get<MovieCreditResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe( map(({ cast }) => cast) );
  };

  getMovieRecommendations(movieId: number, page: number): Observable<MovieResponse[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/recommendations`;
    return this.httpClient.get<MovieResponse[]>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    });
  };

  getMovieSimilar(movieId: number, page: number): Observable<MovieResponse[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/similar`;
    return this.httpClient.get<MovieResponse[]>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    });
  };

  getMovieTrailers(movieId: number): Observable<Trailer[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/videos`;
    return this.httpClient.get<MovieTrailerResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe( map(({ trailers }) => trailers) );
  };

  getMovieWatchProviders(movieId: number): Observable<MovieWatchProviderResponse> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/watch/providers`;
    return this.httpClient.get<MovieWatchProviderResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey
      }
    });
  };

  getMovieKeywords(movieId: number): Observable<Keyword[]> {
    const url = `${ environment.tmdbApiUrl }/movie/${ movieId }/keywords`;
    return this.httpClient.get<MovieKeywordResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey
      }
    }).pipe( map(({ keywords }) => keywords) );
  };
};
