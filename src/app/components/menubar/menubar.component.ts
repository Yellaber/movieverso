import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID,
         signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { NavigationComponent } from '@shared/navigation/navigation.component';
import { SignInButtonComponent } from '@shared/auth/sign-in-button/sign-in-button.component';
import { ScrollableMenuComponent } from '@shared/scrollable-menu/scrollable-menu.component';
import { UserGeolocationService } from '@services/user-geolocation.service';
import { Location, UserGeolocation } from '@interfaces/';

const USER_LOCAL_LOCATION = 'userLocalLocation';
const menuItems = [ 'proximamente', 'estrenos', 'populares', 'valoradas', 'tendencia', 'listado' ];

@Component({
  selector: 'menubar',
  imports: [
    LogoComponent,
    NavigationComponent,
    ScrollableMenuComponent,
    SignInButtonComponent
  ],
  templateUrl: './menubar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenubarComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private userGeolocation = inject(UserGeolocationService);
  userLocation = signal<Location>(Object.create({}));
  items = signal<string[]>(menuItems);

  ngOnInit() {
    isPlatformBrowser(this.platformId) && this.initUserLocation();
  }

  initUserLocation() {
    const userLocalLocation = localStorage.getItem(USER_LOCAL_LOCATION);
    if(userLocalLocation) {
      const userGeoLocation: UserGeolocation = JSON.parse(userLocalLocation);
      const { location } = userGeoLocation;
      this.userLocation.set(location);
    } else {
      this.userGeolocation.getLocation().subscribe(geolocation => {
        localStorage.setItem(USER_LOCAL_LOCATION, JSON.stringify(geolocation))
      });
    }
  };
}
