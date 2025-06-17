import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CarruselMoviesComponent } from '@shared/carrusel-movies/carrusel-movies.component';
import { CarruselMoviesSkeletonComponent } from '@shared/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { TmdbService } from '@services/';
import { SectionMovie, Movie, CarouselConfig } from '@interfaces/';

@Component({
  selector: 'banner-upcoming',
  imports: [
    CarruselMoviesComponent,
    CarruselMoviesSkeletonComponent
  ],
  templateUrl: './banner-upcoming.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex flex-col gap-5 pt-10 lg:pt-15' }
})
export class BannerUpcomingComponent implements OnInit {
  private tmdbService = inject(TmdbService);
  section = input.required<SectionMovie>();
  upcommingMovies = signal<Movie[]>([]);
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.section().carruselTitle,
    movies: this.upcommingMovies(),
    route: this.section().route,
    bgButtons: 'from-stone-900',
    bgCardFooter: 'bg-stone-800'
  }));

  ngOnInit() {
    this.getUpcommingMovies();
  };

  getUpcommingMovies() {
    this.tmdbService.getUpcommingMovies(10)
      .subscribe(upcommingMovies => this.upcommingMovies.set(upcommingMovies));
  };
}
