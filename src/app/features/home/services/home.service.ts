import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.developments';
import { UserGeolocationService } from '@app/core/services';
import { Movie, MovieResponse } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private httpClient = inject(HttpClient);
  private userGeolocationService = inject(UserGeolocationService);
  private cacheQuery = new Map<string, Movie[]>();
  private userGeolocation = this.userGeolocationService.getUserGeolocation;
  private userLanguage = signal<string>('');
  private userCountry = signal<string>('');

  constructor() {
    this.userLanguage.set(this.userGeolocation()?.country_metadata.languages[0]!);
    this.userCountry.set(this.userGeolocation()?.location.country_code2!);
  };

  getMovies(endPoint: string): Observable<Movie[]> {
    const url = `${environment.tmdbApiUrl}/${endPoint}`;
    const key = `${url}/page=1`;
    if(this.cacheQuery.has(key)) {
      return of(<Movie[]>this.cacheQuery.get(key));
    }
    return this.httpClient.get<MovieResponse>(url, {
      params: {
        api_key: environment.tmdbApiKey,
        language: this.userLanguage(),
        region: this.userCountry(),
        page: 1
      }
    }).pipe(
      map(({ results }) => results),
      tap(movies => {
        this.cacheQuery.set(key, movies);
      })
    );
  };
};
