import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserGeolocationService, CacheService } from '@services';
import { Movie, PaginatedMovies } from '@interfaces';

const TTL_PAGINATED = 300_000; // 5 min

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private httpClient = inject(HttpClient);
  private userGeolocationService = inject(UserGeolocationService);
  private cacheService = inject(CacheService);

  getMovies(endPoint: string): Observable<Movie[]> {
    const url = `${environment.tmdbApiUrl}/${endPoint}`;
    const key = `${url}/page=1`;
    const cached = this.cacheService.get<Movie[]>(key);
    if(cached !== null) return of(cached);
    return this.httpClient.get<PaginatedMovies>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userGeolocationService.userLanguage(),
        region: this.userGeolocationService.userCountry(),
        page: 1
      }
    }).pipe(
      map(({ results }) => results),
      tap(movies => this.cacheService.set(key, movies, TTL_PAGINATED))
    );
  }
}
