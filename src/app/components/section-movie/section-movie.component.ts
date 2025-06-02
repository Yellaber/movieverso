import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit,
         signal } from '@angular/core';
import { BannerHeroComponent } from '@components/banner-hero/banner-hero.component';
import { CarruselMoviesComponent } from '@shared/carrusel-movies/carrusel-movies.component';
import { BannerHeroSkeletonComponent } from '@components/banner-hero-skeleton/banner-hero-skeleton.component';
import { CarruselMoviesSkeletonComponent } from '@components/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { TmdbService } from '@services/tmdb.service';
import { SectionMovie, Movie, CarouselConfig } from '@interfaces/';

@Component({
  selector: 'section-movie',
  imports: [
    BannerHeroComponent,
    CarruselMoviesComponent,
    BannerHeroSkeletonComponent,
    CarruselMoviesSkeletonComponent
  ],
  template: `
    @if(movies().length > 0) {
      <banner-hero [heroType]="section().heroType" [heroTitle]="section().heroTitle"
                   [movie]="movies()[0]"/>
      <carrusel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <banner-hero-skeleton/>
      <carrusel-movies-skeleton/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionMovieComponent implements OnInit {
  section = input.required<SectionMovie>();
  movies = signal<Movie[]>([]);
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.section().carruselTitle,
    movies: this.movies(),
    route: this.section().route,
    bgButtons: 'from-stone-900',
    bgCardFooter: 'bg-stone-800'
  }));
  private tmdbService = inject(TmdbService);

  ngOnInit() { this.getDataSectionMovies(); }

  getDataSectionMovies() {
    switch(this.section().heroType) {
      case 'now_playing':
        this.tmdbService.getNowPlayingMovies()
          .subscribe(movies => this.movies.set(movies));
        break;
      case 'popularity':
        this.tmdbService.getMovies('/movie/popular')
          .subscribe(movies => this.movies.set(movies));
        break;
      case 'rated':
        this.tmdbService.getMovies('/movie/top_rated')
          .subscribe(movies => this.movies.set(movies));
        break;
      case 'trending':
        this.tmdbService.getMovies('/trending/movie/day')
          .subscribe(movies => this.movies.set(movies));
        break;
    };
  }
}
