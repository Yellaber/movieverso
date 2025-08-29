import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PlatformService } from '@shared/services';
import { UserGeolocation } from '@shared/interfaces';
import { environment } from '@app/environments/environment.developments';

const USER_LOCAL_LOCATION = 'userLocalLocation';

@Injectable({
  providedIn: 'root'
})
export class UserGeolocationService {
  private platformService = inject(PlatformService);
  private httpClient = inject(HttpClient);
  private translateService = inject(TranslateService);
  private geoLocation = signal<UserGeolocation | undefined>(undefined);
  getUserGeolocation = computed(() => this.geoLocation()?? undefined);

  constructor() {
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setFallbackLang('en');
    this.loadUserLocation();
  };

  private loadUserLocation() {
    if(!this.platformService.isBrowser()) {
      this.geoLocation.set(undefined);
      return;
    }
    const userLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocation) {
      const userGeolocation = JSON.parse(userLocation) as UserGeolocation;
      this.translateService.use(userGeolocation.country_metadata.languages[0].split('-')[0]);
      this.geoLocation.set(userGeolocation);
      return;
    }
    this.getLocation();
  };

  private getLocation() {
    const url = `${environment.ipGeolocationApiUrl}?apiKey=${environment.ipGeolocationApiKey}`;
    this.httpClient.get<UserGeolocation>(url)
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
      ).subscribe(geoLocation => this.geoLocation.set(geoLocation));
  };

  private getUserLanguage(language: string): string[] {
    return (language.includes('es'))? [language]: ['en-US'];
  };
};
