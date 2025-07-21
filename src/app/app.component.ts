import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { routes } from './app.routes';
import { HeaderComponent } from './core/components/header/app-header.component';
import { FooterComponent } from './core/components/app-footer/app-footer.component';
import { UserGeolocationService } from './core/services';
import { RoutesService } from './shared/services/routes.service';

const API_URL_IPGEOLOCATION = 'https://api.ipgeolocation.io/v2/ipgeo';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
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
  };
}
