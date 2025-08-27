import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { LogoComponent } from '@app/core/components/header/logo/logo.component';
import { SearchBarComponent } from '@app/core/components/header/search-bar/search-bar.component';
import { UserGeolocationService } from '@app/core/services';

@Component({
  selector: 'app-header',
  imports: [
    LogoComponent,
    SearchBarComponent,
    TranslatePipe
  ],
  templateUrl: './app-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative' }
})
export class AppHeaderComponent {
  private router = inject(Router);
  private userGeolocationService = inject(UserGeolocationService);
  userGeolocation = this.userGeolocationService.getUserGeolocation;

  navigateToUpcoming() {
    this.router.navigateByUrl('/upcoming');
  };
};
