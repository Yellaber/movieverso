import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
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
  userGeolocation = signal<UserGeolocation | null>(null);

  constructor() {
    isPlatformBrowser(this.platformId) && this.initUserLocation();
  };

  private getLocation(): Observable<UserGeolocation> {
    const url = API_URL_IPGEOLOCATION + '?apiKey=' + API_KEY_IPGEOLOCATION;
    return this.httpClient.get<UserGeolocation>(url);
  };

  private initUserLocation() {
    const userLocalLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocalLocation) {
      this.userGeolocation.set(JSON.parse(userLocalLocation));
      return;
    }
    this.getLocation().subscribe(geolocation => {
      localStorage.setItem(USER_LOCAL_LOCATION, JSON.stringify(geolocation));
      this.userGeolocation.set(geolocation);
    });
  };

  /*getUserLocation() {
    return this.userGeolocation;
  }*/
}
