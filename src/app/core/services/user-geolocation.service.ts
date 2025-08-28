import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PlatformService } from '@shared/services';
import { UserGeolocation } from '@shared/interfaces';
import { environment } from '@app/environments/environment.developments';
import { rxResource } from '@angular/core/rxjs-interop';

const USER_LOCAL_LOCATION = 'userLocalLocation';

@Injectable({
  providedIn: 'root'
})
export class UserGeolocationService {
  private platformService = inject(PlatformService);
  private httpClient = inject(HttpClient);
  private translateService = inject(TranslateService);
  private ipGeolocationApiUrl = signal<string>(environment.ipGeolocationApiUrl);
  private geoLocation = rxResource({
    request: this.ipGeolocationApiUrl,
    loader: ({ request }) => this.loadUserLocation(request)
  });
  getUserGeolocation = computed(() => this.geoLocation.hasValue()? this.geoLocation.value(): undefined);

  constructor() {
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setFallbackLang('en');
  };

  loadUserLocation(apiUrlGeolocation: string): Observable<UserGeolocation | undefined> {
    if(!this.platformService.isBrowser()) { return of(undefined); }
    const userLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocation) {
      const userGeolocation = JSON.parse(userLocation) as UserGeolocation;
      this.translateService.use(userGeolocation.country_metadata.languages[0].split('-')[0]);
      return of(userGeolocation);
    }
    return this.getLocation(apiUrlGeolocation);
  };

  private getLocation(apiUrlGeolocation: string): Observable<UserGeolocation> {
    const url = `${apiUrlGeolocation}?apiKey=${environment.ipGeolocationApiKey}`;
    return this.httpClient.get<UserGeolocation>(url)
      .pipe(
        map(geoLocation => {
          const { country_metadata } = geoLocation;
          country_metadata.languages = this.getUserLanguage(country_metadata.languages[0]);
          return { ...geoLocation, country_metadata };
        }),
        tap(geoLocation => {
          localStorage.setItem(USER_LOCAL_LOCATION, JSON.stringify(geoLocation));
          this.translateService.use(geoLocation.country_metadata.languages[0].split('-')[0]);
        })
      );
  };

  private getUserLanguage(language: string): string[] {
    return (language.includes('es'))? [language]: ['en-US'];
  };
};
