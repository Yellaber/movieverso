import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { BannerHeroComponent } from '../banner-hero/banner-hero.component';
import { BannerHeroSkeletonComponent } from '../banner-hero-skeleton/banner-hero-skeleton.component';
import { CarruselMoviesComponent } from '@shared/carrusel-movies/carrusel-movies.component';
import { CarruselMoviesSkeletonComponent } from '@shared/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { TmdbService } from '@services/tmdb.service';
import { SectionMovie, Movie, CarouselConfig, EndPointValid } from '@interfaces/';

@Component({
  selector: 'section-movie',
  imports: [
    BannerHeroComponent,
    BannerHeroSkeletonComponent,
    CarruselMoviesComponent,
    CarruselMoviesSkeletonComponent
  ],
  template: `
    @if(movies().length > 0) {
      <banner-hero [heroType]="section().heroType" [heroTitle]="section().heroTitle" [movie]="movies()[0]"/>
      <carrusel-movies [carouselConfig]="carouselConfig()"/>
    } @else {
      <banner-hero-skeleton/>
      <carrusel-movies-skeleton/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionMovieComponent implements OnInit {
  private tmdbService = inject(TmdbService);
  section = input.required<SectionMovie>();
  movies = signal<Movie[]>([]);
  route = computed(() => '/' + this.section().heroType);
  carouselConfig = computed<CarouselConfig>(() => ({
    carouselTitle: this.section().carruselTitle,
    movies: this.movies(),
    route: this.route(),
    bgButtons: 'from-stone-900',
    bgCardFooter: 'bg-stone-800'
  }));

  ngOnInit() {
    this.getDataSectionMovies();
  };

  getDataSectionMovies() {
    switch(this.section().heroType) {
      case 'now-playing':
          this.tmdbService.getMovies(EndPointValid.nowPlaying).subscribe(movies => this.movies.set(movies));
        break;
      case 'popular':
        this.tmdbService.getMovies(EndPointValid.popular).subscribe(movies => this.movies.set(movies));
        break;
      case 'top-rated':
        this.tmdbService.getMovies(EndPointValid.topRated).subscribe(movies => this.movies.set(movies));
        break;
      case 'trending':
        this.tmdbService.getMovies(EndPointValid.trending).subscribe(movies => this.movies.set(movies));
        break;
    }
  };
}
