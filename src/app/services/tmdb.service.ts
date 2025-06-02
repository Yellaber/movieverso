import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment.developments';
import { Movie, MovieResponse, Genre, GenreMoviesResponse, DetailMovieResponse,
         MovieTrailerResponse, Trailer, MovieWatchProviderResponse,
         Keyword, MovieKeywordResponse, MovieCollectionResponse } from '@interfaces/';
import { UserGeolocationService } from './user-geolocation.service';

type TypeQuery = DetailMovieResponse | MovieResponse | MovieCollectionResponse | Movie[] |
                 Genre[] | Trailer[] | Keyword[];

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private userGeolocationService = inject(UserGeolocationService);
  private httpClient = inject(HttpClient);
  private params = new HttpParams();
  private cacheQuery = new Map<string, TypeQuery>();
  userCountryCode = '';
  userLanguage = '';

  constructor() { this.initUserLocation(); };

  private initUserLocation() {
    const userGeolocation = this.userGeolocationService.getUserGeolocation();
    if(userGeolocation) {
      const {location, country_metadata} = userGeolocation;
      this.userCountryCode = location.country_code2;
      this.userLanguage = (country_metadata.languages[0].includes('es'))?
      country_metadata.languages[0]: 'en_US';
    }
  };

  getUpcommingMovies(limit?: number, page: number = 1): Observable<Movie[]> {
    const url = `${environment.tmdbApiUrl}/discover/movie`;
    const key = url + '/upcoming-home/page=' + page.toString();
    if(this.cacheQuery.has(key)) {
      return of(<Movie[]>this.cacheQuery.get(key)!);
    }
    const today = new Date().toISOString().split('T')[0];
    const params = new HttpParams()
    .set('api_key', environment.tmdbApiKey)
    .set('include_adult', false)
    .set('include_video', false)
    .set('language', this.userLanguage)
    .set('region', this.userCountryCode)
    .set('sort_by', 'primary_release_date.asc')
    .set('page', page)
    .set('primary_release_date.gte', today);
    return this.httpClient.get<MovieResponse>(url, {params}).pipe(
      map(({results}) => results.filter(movie => movie.poster_path && movie.backdrop_path)),
      map(movies => limit? movies.slice(0, limit): movies),
      tap(movies => this.cacheQuery.set(key, movies))
    );
  };

  getUpcomingMoviesFiltered(genres: string = '', page: number = 1): Observable<MovieResponse> {
    const url = `${environment.tmdbApiUrl}/discover/movie`;
    const key = url + '/upcoming/page=' + page.toString();
    if(this.cacheQuery.has(key)) {
      return of(<MovieResponse>this.cacheQuery.get(key)!);
    }
    const today = new Date().toISOString().split('T')[0];
    let params = new HttpParams()
    .set('api_key', environment.tmdbApiKey)
    .set('include_adult', false)
    .set('include_video', false)
    .set('language', this.userLanguage)
    .set('region', this.userCountryCode)
    .set('sort_by', 'primary_release_date.asc')
    .set('page', page)
    .set('primary_release_date.gte', today);
    if(genres != '') {params = params.set('with_genres', genres);}
    return this.httpClient.get<MovieResponse>(url, {params})
            .pipe(tap(movieResponse => this.cacheQuery.set(key, movieResponse)));
  };

  getNowPlayingMovies(limit?: number, page: number = 1): Observable<Movie[]> {
    const url = `${environment.tmdbApiUrl}/movie/now_playing`;
    const key = url + '/page=' + page.toString();
    if(this.cacheQuery.has(key)) {
      return of(<Movie[]>this.cacheQuery.get(key)!);
    }
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
      })),
      tap(movies => this.cacheQuery.set(key, movies))
    );
  };

  getMovies(endpoint: string, limit?: number, page: number = 1): Observable<Movie[]> {
    const url = environment.tmdbApiUrl + endpoint;
    const key = url + '/page=' + page.toString();
    if(this.cacheQuery.has(key)) {
      return of(<Movie[]>this.cacheQuery.get(key)!);
    }
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        region: this.userCountryCode,
        page
      }
    }).pipe(
      map(({results}) => limit? results.slice(0, limit): results),
      tap(movies => this.cacheQuery.set(key, movies))
    );
  };

  getGenreMovieListByIds(genreIds: number[]): Observable<Genre[]> {
    const url = `${environment.tmdbApiUrl}/genre/movie/list`;
    const key = url + '/ids=' + genreIds.toString();
    if(this.cacheQuery.has(key)) {
      return of(<Genre[]>this.cacheQuery.get(key)!);
    }
    return this.httpClient.get<GenreMoviesResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe(
      map(genreMovies => genreMovies.genres.filter(genre => genreIds.includes(genre.id))),
      tap(genreMovies => this.cacheQuery.set(key, genreMovies))
    );
  };

  getGenreMovieList(): Observable<Genre[]> {
    const url = `${environment.tmdbApiUrl}/genre/movie/list`;
    if(this.cacheQuery.has(url)) {
      return of(<Genre[]>this.cacheQuery.get(url)!);
    }
    return this.httpClient.get<GenreMoviesResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe(
      map(genreMovies => genreMovies.genres),
      map(genres => genres.sort((genre1, genre2) => {
        if(genre1.name > genre2.name) {return 1;}
        if(genre1.name < genre2.name) {return -1;}
        return 0;
      })),
      tap(genres => this.cacheQuery.set(url, genres))
    );
  };

  getMovieById(id: number): Observable<DetailMovieResponse> {
    const url = `${environment.tmdbApiUrl}/movie/${id}`;
    if(this.cacheQuery.has(url)) {
      return of(<DetailMovieResponse>this.cacheQuery.get(url)!);
    }
    return this.httpClient.get<DetailMovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe(tap(detailMovie => this.cacheQuery.set(url, detailMovie)));
  };

  /*getMovieCredits(movieId: number): Observable<Cast[]> {
    this.params.set('language', this.userLanguage)
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/credits`;
    return this.httpClient.get<MovieCreditResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe(map(({cast}) => cast));
  };*/

  getMovieRecommendations(movieId: number, page: number): Observable<MovieResponse> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/recommendations`;
    if(this.cacheQuery.has(url)) {
      return of(<MovieResponse>this.cacheQuery.get(url)!);
    }
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    }).pipe(tap(movieRecomendations => this.cacheQuery.set(url, movieRecomendations)));
  };

  getMovieSimilar(movieId: number, page: number): Observable<MovieResponse> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/similar`;
    if(this.cacheQuery.has(url)) {
      return of(<MovieResponse>this.cacheQuery.get(url)!);
    }
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
        page
      }
    }).pipe(tap(movieSimilars => this.cacheQuery.set(url, movieSimilars)));
  };

  getMovieTrailers(movieId: number): Observable<Trailer[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/videos`;
    if(this.cacheQuery.has(url)) {
      return of(<Trailer[]>this.cacheQuery.get(url)!);
    }
    return this.httpClient.get<MovieTrailerResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe(
      map(({results}) => results),
      tap(results => this.cacheQuery.set(url, results))
    );
  };

  getMovieWatchProviders(movieId: number): Observable<MovieWatchProviderResponse> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/watch/providers`;
    return this.httpClient.get<MovieWatchProviderResponse>(url, {
      params: { api_key: environment.tmdbApiKey }
    });
  };

  getMovieKeywords(movieId: number): Observable<Keyword[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/keywords`;
    if(this.cacheQuery.has(url)) {
      return of(<Keyword[]>this.cacheQuery.get(url)!);
    }
    return this.httpClient.get<MovieKeywordResponse>(url, {
      params: { api_key: environment.tmdbApiKey }
    }).pipe(
      map(({keywords}) => keywords),
      tap(results => this.cacheQuery.set(url, results))
    );
  };

  getMovieCollectionById(id: number): Observable<MovieCollectionResponse> {
    const url = `${environment.tmdbApiUrl}/collection/${id}`;
    if(this.cacheQuery.has(url)) {
      return of(<MovieCollectionResponse>this.cacheQuery.get(url)!);
    }
    this.params.set('language', this.userLanguage)
    return this.httpClient.get<MovieCollectionResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage,
      }
    }).pipe(tap(movieCollection => this.cacheQuery.set(url, movieCollection)));
  };
}
