import { ChangeDetectionStrategy, Component, effect, HostListener, inject, linkedSignal, OnInit,
         PLATFORM_ID, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CarruselCardMoviesComponent } from '@shared/carrusel-movies/carrusel-card-movies/carrusel-card-movies.component';
import { CardMovieSkeletonComponent } from '@components/carrusel-movies-skeleton/card-movie-skeleton/card-movie-skeleton.component';
import { FilterButtonComponent } from '@shared/filter-button/filter-button.component';
import { FilterModalUpcomingMoviesComponent } from '@components/filter-modal-upcoming-movies/filter-modal-upcoming-movies.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { FilterService, SeoFriendlyService, TmdbService } from '@services/';

@Component({
  imports: [
    FontAwesomeModule,
    CarruselCardMoviesComponent,
    CardMovieSkeletonComponent,
    FilterButtonComponent,
    FilterModalUpcomingMoviesComponent,
    NotificationComponent
  ],
  templateUrl: './upcoming.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-12 lg:pt-15' }
})
export default class UpcomingComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private seoFriendlyService = inject(SeoFriendlyService);
  private filterService = inject(FilterService);
  private tmdbService = inject(TmdbService);
  faFilter = faFilter;
  cardMoviesSkeleton = Array(20);
  showModal = signal<boolean>(false);
  page = signal<number>(1);
  genresIdSelected = linkedSignal(() =>
    this.filterService.getGenresId().length > 0? this.filterService.getGenresId().toString(): ''
  );
  upcomingMoviesFiltered = rxResource({
    request: this.genresIdSelected,
    loader: () => this.tmdbService.getUpcomingMoviesFiltered(this.genresIdSelected())
  });
  upcomingMovies = linkedSignal(() =>
    this.upcomingMoviesFiltered.hasValue()? this.upcomingMoviesFiltered.value(): null
  );
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.loadUpcomingMovies();
  };

  pageInitializer = effect(() => {
    const genres = this.genresIdSelected();
    if(genres) {
      this.page.set(1);
    }
  });

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Próximamente', 'Esta es la página para las películas que estarán próximamente en cine.');
  };

  loadUpcomingMovies() {
    if(isPlatformBrowser(this.platformId)) {
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
      if(isAtBottom) {
        this.page.update(value => value + 1);
        this.tmdbService.getUpcomingMoviesFiltered(this.genresIdSelected(), this.page())
          .subscribe(movies => this.upcomingMovies.set([ ...this.upcomingMovies()!, ...movies ]));
      }
    }
  };

  onShowModal() {
    this.showModal.set(true);
  };

  onCloseModal(event: boolean) {
    this.showModal.set(event);
  };
}
