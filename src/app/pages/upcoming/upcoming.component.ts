import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FilterButtonComponent } from '@shared/filter-button/filter-button.component';
import { FilterModalUpcomingMoviesComponent } from './components/filter-modal-upcoming-movies/filter-modal-upcoming-movies.component';
import { LoadUpcomingMoviesComponent } from './components/load-upcoming-movies/load-upcoming-movies.component';
import { FilterService, SeoFriendlyService } from '@services/';
import { Genre } from '@interfaces/';

@Component({
  imports: [
    FontAwesomeModule,
    FilterButtonComponent,
    FilterModalUpcomingMoviesComponent,
    LoadUpcomingMoviesComponent
  ],
  templateUrl: './upcoming.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export default class UpcomingComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);
  private filterService = inject(FilterService);
  faFilter = faFilter;
  showModal = signal<boolean>(false);
  genresSelected = computed<Genre[]>(() => this.filterService.getGenresUpcomingMoviesFiltered());

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Próximamente', 'Esta es la página para las películas que estarán próximamente en cine.');
  };

  onShowModal() {
    this.showModal.set(true);
  };

  onCloseModal(event: boolean) {
    this.showModal.set(event);
  };
}
