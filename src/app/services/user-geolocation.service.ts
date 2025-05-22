import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGeolocation } from '@interfaces/';

@Injectable({
  providedIn: 'root'
})
export class UserGeolocationService {
  private httpClient = inject(HttpClient);

  getLocation(): Observable<UserGeolocation> {
    return this.httpClient.get<UserGeolocation>('https://ipapi.co/json/');
  };
}
