import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { routes } from './app.routes';
import { AppHeaderComponent } from './core/components/header/app-header.component';
import { FooterComponent } from './core/components/app-footer/app-footer.component';
import { environment } from './environments/environment.developments';
import { UserGeolocationService } from './core/services';
import { RoutesService } from './shared/services/routes.service';

@Component({
  selector: 'app-root',
  imports: [
    AppHeaderComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private userGeolocationService = inject(UserGeolocationService);
  private routesService = inject(RoutesService);
  apiUrlGeolocation = signal<string>(environment.ipGeolocationApiUrl);
  geoLocation = rxResource({
    request: this.apiUrlGeolocation,
    loader: ({ request }) => this.userGeolocationService.loadUserLocation(request)
  });
  title = environment.appName;

  constructor() {
    this.routesService.setRoutes(routes);
  };
}
