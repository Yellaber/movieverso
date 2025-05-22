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
  private userGeolocation = signal<UserGeolocation | undefined>(undefined);

  getUserGeolocation(): UserGeolocation | undefined {
    return this.userGeolocation();
  };

  initUserLocation() {
    if(!isPlatformBrowser(this.platformId)) return;
    console.log('Desde servicio, leyendo localStorage:', localStorage.getItem(USER_LOCAL_LOCATION));
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

  private getLocation(): Observable<UserGeolocation> {
    const url = API_URL_IPGEOLOCATION + '?apiKey=' + API_KEY_IPGEOLOCATION;
    return this.httpClient.get<UserGeolocation>(url);
  };
}
