import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { LogoComponent } from '@app/core/components/header/logo/logo.component';
import { SearchBarComponent } from '@app/core/components/header/search-bar/search-bar.component';
import { FilterModalMoviesComponent } from '@shared/components/filter-modal-movies/filter-modal-movies.component';
import { UserGeolocationService } from '@app/core/services';
import { UserGeolocation } from '@shared/interfaces';

@Component({
  selector: 'app-header',
  imports: [
    LogoComponent,
    SearchBarComponent,
    FilterModalMoviesComponent,
    TranslatePipe
  ],
  templateUrl: './app-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative' }
})
export class AppHeaderComponent {
  private router = inject(Router);
  private userGeolocationService = inject(UserGeolocationService);
  searchBarRef = viewChild(SearchBarComponent);
  userGeolocation = signal<UserGeolocation | undefined>(undefined);

  ngOnInit() {
    this.initUserLocation();
  };

  private initUserLocation() {
    const userGeolocation = this.userGeolocationService.getUserGeolocation();
    if(userGeolocation) {
      this.userGeolocation.set(userGeolocation);
    }
  };

  onCloseModal() {
    this.searchBarRef()?.isOpenedFilter.set(false);
  };

  navigateToUpcoming() {
    this.router.navigateByUrl('/upcoming');
  };
}
