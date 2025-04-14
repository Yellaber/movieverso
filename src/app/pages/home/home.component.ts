import { AfterViewInit, ChangeDetectionStrategy, Component, inject,
         OnInit, signal } from '@angular/core';
import { BannerHeroComponent } from '../../components/banner-hero/banner-hero.component';
import { CarruselMoviesComponent } from '../../shared/carrusel-movies/carrusel-movies.component';
import { Movie } from '../../interfaces/movie-response.interface';
import { Genre } from '../../interfaces/genre-movies-response.interface';
import { BannerHeroSkeletonComponent } from '../../components/banner-hero-skeleton/banner-hero-skeleton.component';
import { CarruselMoviesSkeletonComponent } from '../../components/carrusel-movies-skeleton/carrusel-movies-skeleton.component';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { SeoFriendlyService } from '../../services/seo-friendly/seo-friendly.service';

@Component({
  selector: 'home',
  imports: [
    BannerHeroComponent,
    CarruselMoviesComponent,
    BannerHeroSkeletonComponent,
    CarruselMoviesSkeletonComponent
],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent implements OnInit, AfterViewInit {
  popularMovies = signal<Movie[]>([]);
  ratedMovies = signal<Movie[]>([]);
  genresPopularMovie = signal<Genre[]>([]);
  genresRatedMovie = signal<Genre[]>([]);
  private tmdbService = inject(TmdbService);
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit(): void {
    this.seoFriendlyService.setMetaTags('Inicio', 'Esta es la página de inicio');
    this.getPopularMovies();
    this.getTopRatedMovies();
  }

  ngAfterViewInit(): void {
    if(this.popularMovies()[0]) { this.getGenresPopularMovie(); }
    if(this.ratedMovies()[0]) { this.getGenresRatedMovie(); }
  }

  getPopularMovies() {
    this.tmdbService.getPopularMovies(10)
      .subscribe(popularMovies => this.popularMovies.set(popularMovies));
  }

  getTopRatedMovies() {
    this.tmdbService.getTopRatedMovies(10)
      .subscribe(ratedMovies => this.ratedMovies.set(ratedMovies));
  }

  getGenresPopularMovie() {
    this.tmdbService.getGenreMovieList(this.popularMovies()[0].genre_ids)
      .subscribe(genres => this.genresPopularMovie.set(genres));
  }

  getGenresRatedMovie() {
    this.tmdbService.getGenreMovieList(this.ratedMovies()[0].genre_ids)
      .subscribe(genres => this.genresRatedMovie.set(genres));
  }
}
