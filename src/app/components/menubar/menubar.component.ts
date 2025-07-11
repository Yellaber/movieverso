import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FilterModalMoviesComponent } from "@shared/filter-modal-movies/filter-modal-movies.component";
import { UserGeolocationService } from '@services/user-geolocation.service';
import { Location } from '@interfaces/';

@Component({
  selector: 'menubar',
  imports: [
    LogoComponent,
    SearchBarComponent,
    FilterModalMoviesComponent
  ],
  templateUrl: './menubar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative' }
})
export class MenubarComponent implements OnInit {
  private router = inject(Router);
  private userGeolocationService = inject(UserGeolocationService);
  showModal = signal<boolean>(false);
  userLocation = signal<Location | undefined>(undefined);

  ngOnInit() {
    this.initUserLocation();
  };

  private initUserLocation() {
    const userGeolocation = this.userGeolocationService.getUserGeolocation();
    if(userGeolocation) {
      const {location} = userGeolocation;
      this.userLocation.set(location);
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
