import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
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
export class MenubarComponent implements OnInit {
  private userGeolocationService = inject(UserGeolocationService);
  userLocation = signal<Location | undefined>(undefined);
  items = signal<string[]>(menuItems);

  ngOnInit() {
    this.initUserLocation();
  };

  initUserLocation() {
    this.userGeolocationService.initUserLocation();
    const userGeolocation = this.userGeolocationService.getUserGeolocation();
    if(userGeolocation) {
      const { location } = userGeolocation;
      this.userLocation.set(location);
    }
  };
}
