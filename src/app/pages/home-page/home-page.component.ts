import { Component, inject, OnInit, signal } from '@angular/core';
import { BannerHeroComponent } from '../../components/banner-hero/banner-hero.component';
import { TopPopularComponent } from '../../components/top-popular/top-popular.component';
import { TopVoteComponent } from '../../components/top-vote/top-vote.component';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../interfaces/movie-response.interface';
import { Genre } from '../../interfaces/genre-movies-response.interface';

@Component({
  imports: [
    BannerHeroComponent,
    TopPopularComponent,
    TopVoteComponent
],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent implements OnInit {
  popularMovies = signal<Movie[]>([]);
  ratedMovies = signal<Movie[]>([]);
  genres = signal<Genre[]>([]);
  private tmdbService = inject(TmdbService);

  ngOnInit(): void {
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getGenreList();
  }

  getPopularMovies() {
    this.tmdbService.getPopularMovies(10)
      .subscribe(popularMovies => this.popularMovies.set(popularMovies));
  }

  getTopRatedMovies() {
    this.tmdbService.getTopRatedMovies(10)
      .subscribe(ratedMovies => this.ratedMovies.set(ratedMovies));
  }

  getGenreList() {
    this.tmdbService.getGenreMovieList()
      .subscribe(genres => this.genres.set(genres));
  }
}
