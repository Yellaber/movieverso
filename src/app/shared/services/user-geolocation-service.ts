import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PlatformService } from '@services';
import { UserGeolocation } from '@interfaces';
import { environment } from '@environments/environment';

const USER_LOCAL_LOCATION = 'userLocalLocation';

@Injectable({
  providedIn: 'root'
})
export class UserGeolocationService {
  private platformService = inject(PlatformService);
  private httpClient = inject(HttpClient);
  private translateService = inject(TranslateService);
  private geolocation = signal<UserGeolocation | undefined>(undefined);
  getUserGeolocation = computed(() => this.geolocation()?? undefined);

  constructor() {
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setFallbackLang('en');
  }

  loadUserLocation(): Observable<UserGeolocation | undefined> {
    if(!this.platformService.isBrowser()) {
      this.geolocation.set(undefined);
      return of(undefined);
    }
    const userLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocation) {
      const userGeolocation = JSON.parse(userLocation) as UserGeolocation;
      this.translateService.use(userGeolocation.country_metadata.languages[0].split('-')[0]);
      this.geolocation.set(userGeolocation);
      return of(userGeolocation);
    }
    return this.getLocation();
  }

  private getLocation(): Observable<UserGeolocation> {
    const url = `${environment.ipGeolocationApiUrl}?apiKey=${environment.ipGeolocationApiKey}`;
    return this.httpClient.get<UserGeolocation>(url)
      .pipe(
        map(geolocation => {
          const { country_metadata } = geolocation;
          country_metadata.languages = this.getUserLanguage(country_metadata.languages[0]);
          return { ...geolocation, country_metadata };
        }),
        tap(geolocation => {
          localStorage.setItem(USER_LOCAL_LOCATION, JSON.stringify(geolocation));
          this.translateService.use(geolocation.country_metadata.languages[0].split('-')[0]);
          this.geolocation.set(geolocation);
        })
      )
  }

  private getUserLanguage(language: string): string[] {
    return (language.includes('es'))? [language]: ['en-US'];
  }
}
