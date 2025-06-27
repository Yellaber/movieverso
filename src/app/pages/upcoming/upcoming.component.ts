import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FilterButtonComponent } from '@shared/filter-button/filter-button.component';
import { FilterModalMoviesComponent } from '@shared/filter-modal-movies/filter-modal-movies.component';
import { LoadMoviesFilteredComponent } from '@shared/load-movies-filtered/load-movies-filtered.component';
import { FilterService, SeoFriendlyService } from '@services/';
import { QueryParams } from '@interfaces/';

@Component({
  imports: [
    FilterButtonComponent,
    FilterModalMoviesComponent,
    LoadMoviesFilteredComponent
  ],
  templateUrl: './upcoming.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export default class UpcomingComponent implements OnInit {
  showModal = signal<boolean>(false);
  queryParams = signal<QueryParams>({});
  genresSelected = computed<QueryParams>(() => this.queryParams());
  private seoFriendlyService = inject(SeoFriendlyService);
  private filterService = inject(FilterService);

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Próximamente', 'Esta es la página para las películas que estarán próximamente en cine.');
    this.queryParams.set(this.filterService.getQueryParams('upcoming'));
  };

  onShowModal() {
    this.showModal.set(true);
  };

  onCloseModal(event: boolean) {
    this.showModal.set(event);
  };

  onQueryParams(event: QueryParams) {
    this.queryParams.set(event);
  };
}
