import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, tap } from 'rxjs';
import { UserGeolocation } from '@shared/interfaces';

const USER_LOCAL_LOCATION = 'userLocalLocation';
const API_KEY_IPGEOLOCATION = '65139d689b9a48b2b125c9365c130b1f';

@Injectable({
  providedIn: 'root'
})
export class UserGeolocationService {
  private platformId = inject(PLATFORM_ID);
  private httpClient = inject(HttpClient);
  private userGeolocation: UserGeolocation | undefined;

  loadUserLocation(apiUrlGeolocation: string): Observable<UserGeolocation | undefined> {
    if(!isPlatformBrowser(this.platformId)) { return of(); }
    const userLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocation) {
      const geoLocation = <UserGeolocation>JSON.parse(userLocation);
      this.userGeolocation = geoLocation;
      return of(geoLocation);
    }
    return this.getLocation(apiUrlGeolocation);
  };

  private getLocation(apiUrlGeolocation: string): Observable<UserGeolocation> {
    const url = `${apiUrlGeolocation}?apiKey=${API_KEY_IPGEOLOCATION}`;
    return this.httpClient.get<UserGeolocation>(url)
      .pipe(
        tap(geoLocation => {
          const { country_metadata } = geoLocation;
          country_metadata.languages = this.getUserLanguage(country_metadata.languages[0]);
          this.userGeolocation = {
            ...geoLocation,
            country_metadata
          };
          localStorage.setItem(USER_LOCAL_LOCATION, JSON.stringify(geoLocation));
        })
      );
  };

  private getUserLanguage(language: string): string[] {
    return (language.includes('es'))? [language]: ['en_US'];
  };

  getUserGeolocation(): UserGeolocation | undefined {
    return this.userGeolocation;
  };
}
