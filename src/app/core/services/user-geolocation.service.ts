import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, tap } from 'rxjs';
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
  private userGeolocation: UserGeolocation | undefined;

  constructor() {
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setFallbackLang('en');
  };

  loadUserLocation(apiUrlGeolocation: string): Observable<UserGeolocation | undefined> {
    if(!this.platformService.isBrowser()) { return of(undefined); }
    const userLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocation) {
      this.userGeolocation = JSON.parse(userLocation) as UserGeolocation;
      this.translateService.use(this.userGeolocation.country_metadata.languages[0].split('-')[0]);
      return of(this.userGeolocation);
    }
    return this.getLocation(apiUrlGeolocation);
  };

  private getLocation(apiUrlGeolocation: string): Observable<UserGeolocation> {
    const url = `${apiUrlGeolocation}?apiKey=${environment.ipGeolocationApiKey}`;
    return this.httpClient.get<UserGeolocation>(url)
      .pipe(
        tap(geoLocation => {
          const { country_metadata } = geoLocation;
          country_metadata.languages = this.getUserLanguage(country_metadata.languages[0]);
          this.userGeolocation = { ...geoLocation, country_metadata };
          localStorage.setItem(USER_LOCAL_LOCATION, JSON.stringify(this.userGeolocation));
          this.translateService.use(country_metadata.languages[0].split('-')[0]);
        })
      );
  };

  private getUserLanguage(language: string): string[] {
    return (language.includes('es'))? [language]: ['en-US'];
  };

  getUserGeolocation(): UserGeolocation | undefined {
    return this.userGeolocation;
  };
}
