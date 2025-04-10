import { AfterViewInit, ChangeDetectionStrategy, Component, inject,
         OnInit, signal } from '@angular/core';
import { BannerHeroComponent } from '../../components/banner-hero/banner-hero.component';
import { TopPopularComponent } from '../../components/top-popular/top-popular.component';
import { TopVoteComponent } from '../../components/top-vote/top-vote.component';
import { TmdbService } from '../../services/tmdb-service/tmdb.service';
import { Movie } from '../../interfaces/movie-response.interface';
import { Genre } from '../../interfaces/genre-movies-response.interface';

@Component({
  selector: 'home',
  imports: [
    BannerHeroComponent,
    TopPopularComponent,
    TopVoteComponent
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

  ngOnInit(): void {
    this.getPopularMovies();
    this.getTopRatedMovies();
  }

  ngAfterViewInit(): void {
    this.getGenresPopularMovie();
    this.getGenresRatedMovie();
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
