import { ChangeDetectionStrategy, Component, inject, OnInit, effect, signal,
         computed } from '@angular/core';
import { BannerHeroComponent } from '../../components/banner-hero/banner-hero.component';
import { BannerHeroSkeletonComponent } from '../../components/banner-hero-skeleton/banner-hero-skeleton.component';
import { CarruselMoviesSkeletonComponent } from '../../components/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { CarruselMoviesComponent } from '../../shared/carrusel-movies/carrusel-movies.component';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { SeoFriendlyService } from '../../services/seo-friendly/seo-friendly.service';
import { Movie } from '../../interfaces/movie-response.interface';
import { Genre } from '../../interfaces/genre-movies-response.interface';

type typeTag = 'popularity' | 'rated' | 'trending' | 'upcomming';

interface section {
  heroType: typeTag,
  heroTitle: string,
  carruselTitle: string,
  route: string,
  movie: Movie,
  genres: Genre[],
  movies: Movie[]
}

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
  sections: section[] = [];
  readonly isDataLoaded = computed(() => this.areAllDataLoaded());
  private tmdbService = inject(TmdbService);
  private seoFriendlyService = inject(SeoFriendlyService);

  constructor() {
    effect(() => {
      this.getUpcommingMovies();
      this.getPopularMovies();
      this.getTopRatedMovies();
      this.getTrendingMovies();
      if(this.isDataLoaded()) { this.loadSections(); }
    });
  }

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Inicio', 'Esta es la página de inicio');
  }

  areAllDataLoaded() {
    return !!(
      this.popularMovies()[0] &&
      this.ratedMovies()[0] &&
      this.trendingMovies()[0] &&
      this.upcommingMovies()[0]
    );
  }

  loadSections() {
    this.sections = [
      {
        heroType: 'upcomming',
        heroTitle: 'Estrenos',
        carruselTitle: 'Top 10 - Estrenos',
        route: '/estrenos',
        movie: this.upcommingMovies()[0],
        genres: this.genresUpcommingMovie(),
        movies: this.upcommingMovies()
      },
      {
        heroType: 'popularity',
        heroTitle: 'Más popular',
        carruselTitle: 'Top 10 - Más populares',
        route: '/populares',
        movie: this.popularMovies()[0],
        genres: this.genresPopularMovie(),
        movies: this.popularMovies()
      },
      {
        heroType: 'rated',
        heroTitle: 'Más valorada',
        carruselTitle: 'Top 10 - Más valoradas',
        route: '/valoradas',
        movie: this.ratedMovies()[0],
        genres: this.genresRatedMovie(),
        movies: this.ratedMovies()
      },
      {
        heroType: 'trending',
        heroTitle: 'En tendencia',
        carruselTitle: 'Top 10 - En tendencia',
        route: '/tendencia',
        movie: this.trendingMovies()[0],
        genres: this.genresTrendingMovie(),
        movies: this.trendingMovies()
      }
    ];
  }

  getUpcommingMovies() {
    this.tmdbService.getUpcommingMovies(10)
      .subscribe(upcommingMovies => this.upcommingMovies.set(upcommingMovies));

      if(this.upcommingMovies()[0]) {
      this.tmdbService.getGenreMovieList(this.upcommingMovies()[0].genre_ids)
        .subscribe(genres => this.genresUpcommingMovie.set(genres));
    }
  }

  getPopularMovies() {
    this.tmdbService.getPopularMovies(10)
      .subscribe(popularMovies => this.popularMovies.set(popularMovies));

    if(this.popularMovies()[0]) {
      this.tmdbService.getGenreMovieList(this.popularMovies()[0].genre_ids)
        .subscribe(genres => this.genresPopularMovie.set(genres));
    }
  }

  getTopRatedMovies() {
    this.tmdbService.getTopRatedMovies(10)
      .subscribe(ratedMovies => this.ratedMovies.set(ratedMovies));

    if(this.ratedMovies()[0]) {
      this.tmdbService.getGenreMovieList(this.ratedMovies()[0].genre_ids)
        .subscribe(genres => this.genresRatedMovie.set(genres));
    }
  }

  getTrendingMovies() {
    this.tmdbService.getTrendingMovies(10)
      .subscribe(trendingMovies => this.trendingMovies.set(trendingMovies));

    if(this.trendingMovies()[0]) {
      this.tmdbService.getGenreMovieList(this.trendingMovies()[0].genre_ids)
        .subscribe(genres => this.genresTrendingMovie.set(genres));
    }
  }
}
