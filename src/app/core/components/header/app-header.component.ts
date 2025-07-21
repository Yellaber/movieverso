import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LogoComponent } from '@app/core/components/header/logo/logo.component';
import { SearchBarComponent } from '@app/core/components/header/search-bar/search-bar.component';
import { FilterModalMoviesComponent } from '@shared/components/filter-modal-movies/filter-modal-movies.component';
import { UserGeolocationService } from '@app/core/services';
import { UserGeolocation } from '@app/shared/interfaces';

@Component({
  selector: 'app-header',
  imports: [
    LogoComponent,
    SearchBarComponent,
    FilterModalMoviesComponent
  ],
  templateUrl: './app-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative' }
})
export class HeaderComponent {
  private router = inject(Router);
  private userGeolocationService = inject(UserGeolocationService);
  showModal = signal<boolean>(false);
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

  onShowModal() {
    this.showModal.set(true);
  };

  onCloseModal(event: boolean) {
    this.showModal.set(event);
  };

  navigateToUpcoming() {
    this.router.navigateByUrl('/upcoming');
  };
}
