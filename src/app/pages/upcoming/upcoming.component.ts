import { ChangeDetectionStrategy, Component, effect, inject, PLATFORM_ID,
         signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Genre, MovieResponse } from '@interfaces/';
import { SeoFriendlyService, TmdbService } from '@services/';
import { CarruselCardMoviesComponent } from '@shared/carrusel-movies/carrusel-card-movies/carrusel-card-movies.component';
import { CardMovieSkeletonComponent } from '@components/carrusel-movies-skeleton/card-movie-skeleton/card-movie-skeleton.component';
import { PaginationComponent } from '@shared/pagination/pagination.component';

@Component({
  imports: [
    CarruselCardMoviesComponent,
    CardMovieSkeletonComponent,
    PaginationComponent
  ],
  templateUrl: './upcoming.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-10 pt-3 lg:pt-15' }
})
export default class UpcomingComponent {
  skeletonCards = Array(20);
  genresMovies = signal<Genre[]>([]);
  upcomingMovies = signal<MovieResponse | null>(null);
  page = signal<number>(1);
  private platformId = inject(PLATFORM_ID);
  private seoFriendlyService = inject(SeoFriendlyService);
  private tmdbService = inject(TmdbService);

  constructor() {
    effect(() => {
      this.getUpcomingMoviesFiltered('', this.page());
    });
  };

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Próximamente', 'Esta es la página para las películas que estarán próximamente en cine.');
    this.getGenreMovieList();
  };

  getGenreMovieList() {
    this.tmdbService.getGenreMovieList().subscribe(genres => this.genresMovies.set(genres));
  };

  getUpcomingMoviesFiltered(genres?: string, page?: number) {
    this.upcomingMovies.set(null);
    this.tmdbService.getUpcomingMoviesFiltered(genres, page)
      .subscribe(movieResponse => { this.upcomingMovies.set(movieResponse) });
  };

  onClick(newPage: number) {
    if(isPlatformBrowser(this.platformId)) { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    this.page.set(newPage);
  };
}
