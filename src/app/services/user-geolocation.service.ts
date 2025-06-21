import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, tap } from 'rxjs';
import { UserGeolocation } from '@interfaces/';

const USER_LOCAL_LOCATION = 'userLocalLocation';
const API_URL_IPGEOLOCATION = 'https://api.ipgeolocation.io/v2/ipgeo';
const API_KEY_IPGEOLOCATION = '65139d689b9a48b2b125c9365c130b1f';

@Injectable({
  providedIn: 'root'
})
export class UserGeolocationService {
  private platformId = inject(PLATFORM_ID);
  private httpClient = inject(HttpClient);
  private userGeolocation: Observable<UserGeolocation | undefined> = (of());

  constructor() {
    this.initUserLocation();
  };

  private initUserLocation() {
    if(!isPlatformBrowser(this.platformId)) { return; }
    const userLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocation) {
      const location = <UserGeolocation>JSON.parse(userLocation);
      this.userGeolocation = of(location);
      return;
    }
    this.userGeolocation = this.getLocation();
  };

  private getLocation(): Observable<UserGeolocation> {
    const url = `${API_URL_IPGEOLOCATION}?apiKey=${API_KEY_IPGEOLOCATION}`;
    return this.httpClient.get<UserGeolocation>(url)
      .pipe(
        tap(geoLocation => localStorage.setItem(USER_LOCAL_LOCATION, JSON.stringify(geoLocation)))
      );
  };

  getUserGeolocation(): Observable<UserGeolocation | undefined> {
    return this.userGeolocation;
  };
}
