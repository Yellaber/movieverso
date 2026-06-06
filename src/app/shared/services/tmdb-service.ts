import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { UserGeolocationService } from './user-geolocation-service';
import { CacheService } from './cache-service';
import { Movie, PaginatedMovies, Genre, GenreMovies, DetailMovie } from '@interfaces';

const TTL_GENRES    = 86_400_000; // 24 h
const TTL_DETAIL    = 1_800_000;  // 30 min
const TTL_PAGINATED = 300_000;    // 5 min

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
  private cacheService = inject(CacheService);
  private params: Params;

  constructor() {
    this.params = {
      api_key: environment.tmdbApiKey,
      language: this.userGeolocationService.userLanguage(),
      region: this.userGeolocationService.userCountry(),
      page: 0
    };
  }

  private getPaginatedMovies(url: string, params: Params): Observable<PaginatedMovies[]> {
    if(params.page! <= 0) { return of([]); }
    // Clave de caché diferenciada: el listado paginado acumula PaginatedMovies[], mientras que
    // DetailService.getRelatedMovies cachea un único objeto PaginatedMovies bajo la URL base.
    // Compartir la misma clave corrompería ambas lecturas (ver fix-related-movies-cache-collision).
    const cacheKey = `${url}::paginated`;
    const cached = this.cacheService.get<PaginatedMovies[]>(cacheKey) ?? [];
    if(params.page === 1 && cached.length > 0) { return of(cached); }
    if(params.page! <= cached.length) { return of(cached); }
    return this.httpClient.get<PaginatedMovies>(url, { params: { ...params } }).pipe(
      map(response => {
        const updated = [...cached, response];
        this.cacheService.set(cacheKey, updated, TTL_PAGINATED);
        return updated;
      })
    );
  }

  getPaginatedMoviesByCategory(category: string, page: number = 1): Observable<PaginatedMovies[]> {
    const url = `${environment.tmdbApiUrl}/${category}`;
    const { api_key, language, region } = this.params;
    return this.getPaginatedMovies(url, { api_key, language, region, page });
  }

  getPaginatedMoviesBasedIn(basedIn: string, movieId: number, page: number = 1): Observable<PaginatedMovies[]> {
    const url = `${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}`;
    const { api_key, language } = this.params;
    return this.getPaginatedMovies(url, { api_key, language, page });
  }

  getGenresMovie(): Observable<Genre[]> {
    const url = `${environment.tmdbApiUrl}/genre/movie/list`;
    const cached = this.cacheService.get<Genre[]>(url);
    if(cached !== null) return of(cached);
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
      tap(genres => this.cacheService.set(url, genres, TTL_GENRES))
    );
  }

  getGenresMovieByIds(genreIds: number[]): Observable<Genre[]> {
    const key = `${environment.tmdbApiUrl}/genre/movie/list/ids=${genreIds.toString()}`;
    const cached = this.cacheService.get<Genre[]>(key);
    if(cached !== null) return of(cached);
    return this.getGenresMovie().pipe(
      map(genres => genres.filter(genre => genreIds.includes(genre.id))),
      tap(genres => this.cacheService.set(key, genres, TTL_GENRES))
    );
  }

  getDetailMovieById(id: number): Observable<DetailMovie> {
    const url = `${environment.tmdbApiUrl}/movie/${id}`;
    const cached = this.cacheService.get<DetailMovie>(url);
    if(cached !== null) return of(cached);
    const { api_key, language } = this.params;
    return this.httpClient.get<DetailMovie>(url, {
      params: { api_key, language }
    }).pipe(tap(detailMovie => this.cacheService.set(url, detailMovie, TTL_DETAIL)));
  }
}
