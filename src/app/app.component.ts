import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenubarComponent } from '@components/menubar/menubar.component';
import { FooterSiteComponent } from '@components/footer-site/footer-site.component';
import { RouterOutlet } from '@angular/router';
import { RoutesService } from './services/routes.service';
import { routes } from './app.routes';

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
  private routesService = inject(RoutesService);
  title = 'MovieVerso';

  constructor() {
    this.routesService.setRoutes(routes);
  }
}
