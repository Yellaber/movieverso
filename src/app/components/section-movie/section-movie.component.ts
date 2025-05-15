import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { BannerHeroComponent } from '../banner-hero/banner-hero.component';
import { CarruselMoviesComponent } from '../../shared/carrusel-movies/carrusel-movies.component';
import { BannerHeroSkeletonComponent } from '../banner-hero-skeleton/banner-hero-skeleton.component';
import { CarruselMoviesSkeletonComponent } from '../carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { SectionMovie } from '../../interfaces/sectionMovie.interface';
import { Movie } from '../../interfaces/movie-response.interface';

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
      <carrusel-movies [carruselTitle]="section().carruselTitle" [route]="section().route"
                       [movies]="movies()"/>
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
  private tmdbService = inject(TmdbService);

  ngOnInit() {
    this.getDataSectionMovies();
  }

  getDataSectionMovies() {
    switch(this.section().heroType) {
      case 'now_playing':
        this.tmdbService.getNowPlayingMovies(10)
          .subscribe(movies => this.movies.set(movies));
        break;
      case 'popularity':
        this.tmdbService.getPopularMovies(10)
          .subscribe(movies => this.movies.set(movies));
        break;
      case 'rated':
        this.tmdbService.getTopRatedMovies(10)
          .subscribe(movies => this.movies.set(movies));
        break;
      case 'trending':
        this.tmdbService.getTrendingMovies(10)
          .subscribe(movies => this.movies.set(movies));
        break;
    };
  }
}
