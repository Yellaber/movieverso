import { ChangeDetectionStrategy, Component, inject, OnInit, effect, signal } from '@angular/core';
import { BannerHeroComponent } from '../../components/banner-hero/banner-hero.component';
import { CarruselMoviesComponent } from '../../shared/carrusel-movies/carrusel-movies.component';
import { BannerHeroSkeletonComponent } from '../../components/banner-hero-skeleton/banner-hero-skeleton.component';
import { CarruselMoviesSkeletonComponent } from '../../components/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { SeoFriendlyService } from '../../services/seo-friendly/seo-friendly.service';
import { Movie } from '../../interfaces/movie-response.interface';
import { Genre } from '../../interfaces/genre-movies-response.interface';

@Component({
  selector: 'home',
  imports: [
    BannerHeroComponent,
    CarruselMoviesComponent,
    BannerHeroSkeletonComponent,
    CarruselMoviesSkeletonComponent,
],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent implements OnInit {
  upcommingMovies = signal<Movie[]>([]);
  popularMovies = signal<Movie[]>([]);
  ratedMovies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);
  genresPopularMovie = signal<Genre[]>([]);
  genresRatedMovie = signal<Genre[]>([]);
  genresTrendingMovie = signal<Genre[]>([]);
  genresUpcommingMovie = signal<Genre[]>([]);
  private tmdbService = inject(TmdbService);
  private seoFriendlyService = inject(SeoFriendlyService);

  constructor() {
    effect(() => {
      this.getGenresUpcommingMovie();
    });

    effect(() => {
      this.getGenresPopularMovie();
    });

    effect(() => {
      this.getGenresRatedMovie();
    });

    effect(() => {
      this.getGenresTrendingMovie();
    });
  }

  ngOnInit(): void {
    this.seoFriendlyService.setMetaTags('Inicio', 'Esta es la página de inicio');
    this.getUpcommingMovies();
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getTrendingMovies();
  }

  getUpcommingMovies() {
    this.tmdbService.getUpcommingMovies(10)
      .subscribe(upcommingMovies => this.upcommingMovies.set(upcommingMovies));
  }

  getPopularMovies() {
    this.tmdbService.getPopularMovies(10)
      .subscribe(popularMovies => this.popularMovies.set(popularMovies));
  }

  getTopRatedMovies() {
    this.tmdbService.getTopRatedMovies(10)
      .subscribe(ratedMovies => this.ratedMovies.set(ratedMovies));
  }

  getTrendingMovies() {
    this.tmdbService.getTrendingMovies(10)
      .subscribe(trendingMovies => this.trendingMovies.set(trendingMovies));
  }

  getGenresUpcommingMovie() {
    if(this.upcommingMovies()[0]) {
      this.tmdbService.getGenreMovieList(this.upcommingMovies()[0].genre_ids)
        .subscribe(genres => this.genresUpcommingMovie.set(genres));
    }
  }

  getGenresPopularMovie() {
    if(this.popularMovies()[0]) {
      this.tmdbService.getGenreMovieList(this.popularMovies()[0].genre_ids)
        .subscribe(genres => this.genresPopularMovie.set(genres));
    }
  }

  getGenresRatedMovie() {
    if(this.ratedMovies()[0]) {
      this.tmdbService.getGenreMovieList(this.ratedMovies()[0].genre_ids)
        .subscribe(genres => this.genresRatedMovie.set(genres));
    }
  }

  getGenresTrendingMovie() {
    if(this.trendingMovies()[0]) {
      this.tmdbService.getGenreMovieList(this.trendingMovies()[0].genre_ids)
        .subscribe(genres => this.genresTrendingMovie.set(genres));
    }
  }
}
