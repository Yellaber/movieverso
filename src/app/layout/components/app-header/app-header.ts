import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LogoComponent } from './logo/logo.component';
import { SearchBar } from './search-bar/search-bar';
import { UserGeolocationService } from '@services';

@Component({
  selector: 'app-header',
  imports: [
    LogoComponent,
    SearchBar,
    TranslatePipe
  ],
  templateUrl: './app-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  private router = inject(Router);
  private userGeolocationService = inject(UserGeolocationService);
  userGeolocation = this.userGeolocationService.getUserGeolocation;
  countryFlag = computed(() => {
    const userGeolocation = this.userGeolocation();
    return userGeolocation? userGeolocation.location.country_flag: '';
  });

  navigateToUpcoming() {
    this.router.navigateByUrl('/upcoming');
  }
}
