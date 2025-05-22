import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NavigationComponent } from '@shared/navigation/navigation.component';
import { SignInButtonComponent } from '@shared/auth/sign-in-button/sign-in-button.component';
import { ScrollableMenuComponent } from '@shared/scrollable-menu/scrollable-menu.component';
import { UserGeolocationService } from '@services/user-geolocation.service';
import { Location } from '@interfaces/';

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
export class MenubarComponent implements AfterViewInit {
  private userGeolocationService = inject(UserGeolocationService);
  userLocation = signal<Location | undefined>(this.userGeolocationService.userGeolocation()?.location);
  items = signal<string[]>(menuItems);

  ngAfterViewInit() {
    //this.initUserLocation();
  };

  /*initUserLocation() {
    const userGeolocation = this.userGeolocationService.userGeolocation();
    if(userGeolocation) {
      const { location } = userGeolocation;
      this.userLocation.set(location);
    }
  };*/
}
