import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
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
  private platformId = inject(PLATFORM_ID);
  private httpClient = inject(HttpClient);
  userLocation = signal<UserGeolocation>(Object.create({}));
  userLanguage = '';
  userCountryCode = '';

  constructor() {
    isPlatformBrowser(this.platformId) && this.initUserLocation();
  };

  initUserLocation() {
    const userLocalLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocalLocation) {
      this.userLocation.set(JSON.parse(userLocalLocation));
      const { location, country_metadata } = this.userLocation();
      this.userLanguage = country_metadata.languages[0];
      this.userCountryCode = location.country_code2;
    }
  };

  /*getLocalDateFormatted(): string {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: this.userLocation().timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(new Date());
  }*/

  getUpcommingMovies(limit?: number, page: number = 1): Observable<Movie[]> {
    const today = new Date().toISOString().split('T')[0];
    //const today = this.getLocalDateFormatted();
    const params = new HttpParams()
    .set('api_key', environment.tmdbApiKey)
    .set('language', this.userLanguage)
    .set('region', this.userCountryCode)
    .set('sort_by', 'primary_release_date.asc')
    .set('page', page)
    .set('primary_release_date.gte', today);
    const url = `${environment.tmdbApiUrl}/discover/movie`;
    return this.httpClient.get<MovieResponse>(url, {params}).pipe(
      map(({results}) => results.filter(movie => movie.poster_path && movie.backdrop_path)),
      map((movies) => limit? movies.slice(0, limit): movies),
    );
  };

  getNowPlayingMovies(limit?: number, page: number = 1): Observable<Movie[]> {
    const url = `${environment.tmdbApiUrl}/movie/now_playing`;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        region: this.userCountryCode,
        page
      }
    }).pipe(
      map(({results}) => limit? results.slice(0, limit): results),
      map(movies => movies.sort((movie1, movie2) => {
        const dateMovie1 = new Date(movie1.release_date);
        const dateMovie2 = new Date(movie2.release_date);
        return dateMovie2.getTime() - dateMovie1.getTime();
      }))
    );
  };

  getMovies(endpoint: string, limit?: number, page: number = 1): Observable<Movie[]> {
    const url = environment.tmdbApiUrl + endpoint;
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        region: this.userCountryCode,
        page
      }
    }).pipe(map(({results}) => limit? results.slice(0, limit): results));
  };

  getGenreMovieList(genreIds: number[]): Observable<Genre[]> {
    const url = `${environment.tmdbApiUrl}/genre/movie/list`;
    return this.httpClient.get<GenreMoviesResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe(map(({genres}) => genres.filter(genre => genreIds.includes(genre.id))));
  };

  getMovieById(id: number): Observable<DetailMovieResponse> {
    const url = `${environment.tmdbApiUrl}/movie/${id}`;
    return this.httpClient.get<DetailMovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    });
  };

  getMovieCredits(movieId: number): Observable<Cast[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/credits`;
    return this.httpClient.get<MovieCreditResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe(map(({cast}) => cast));
  };

  getMovieRecommendations(movieId: number, page: number): Observable<MovieResponse[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/recommendations`;
    return this.httpClient.get<MovieResponse[]>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    });
  };

  getMovieSimilar(movieId: number, page: number): Observable<MovieResponse[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/similar`;
    return this.httpClient.get<MovieResponse[]>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    });
  };

  getMovieTrailers(movieId: number): Observable<Trailer[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/videos`;
    return this.httpClient.get<MovieTrailerResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe(map(({trailers}) => trailers));
  };

  getMovieWatchProviders(movieId: number): Observable<MovieWatchProviderResponse> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/watch/providers`;
    return this.httpClient.get<MovieWatchProviderResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey
      }
    });
  };

  getMovieKeywords(movieId: number): Observable<Keyword[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/keywords`;
    return this.httpClient.get<MovieKeywordResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey
      }
    }).pipe(map(({keywords}) => keywords));
  };
};
