import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MenubarComponent } from '@components/menubar/menubar.component';
import { FooterSiteComponent } from '@components/footer-site/footer-site.component';
import { RouterOutlet } from '@angular/router';
import { RoutesService, UserGeolocationService } from '@services/';
import { routes } from './app.routes';
import { rxResource } from '@angular/core/rxjs-interop';

const API_URL_IPGEOLOCATION = 'https://api.ipgeolocation.io/v2/ipgeo';

@Component({
  selector: 'app-root',
  imports: [
    MenubarComponent,
    FooterSiteComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private userGeolocationService = inject(UserGeolocationService);
  private routesService = inject(RoutesService);
  apiUrlGeolocation = signal<string>(API_URL_IPGEOLOCATION);
  geoLocation = rxResource({
    request: this.apiUrlGeolocation,
    loader: () => this.userGeolocationService.loadUserLocation(this.apiUrlGeolocation())
  });
  title = 'MovieVerso';

  constructor() {
    this.routesService.setRoutes(routes);
  }
}
