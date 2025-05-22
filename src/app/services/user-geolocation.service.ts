import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGeolocation } from '@interfaces/';

const API_URL_IPGEOLOCATION = 'https://api.ipgeolocation.io/v2/ipgeo';
const API_KEY_IPGEOLOCATION = '65139d689b9a48b2b125c9365c130b1f';

@Injectable({
  providedIn: 'root'
})
export class UserGeolocationService {
  private httpClient = inject(HttpClient);

  getLocation(): Observable<UserGeolocation> {
    const url = API_URL_IPGEOLOCATION + '?apiKey=' + API_KEY_IPGEOLOCATION;
    return this.httpClient.get<UserGeolocation>(url);
  };
}
