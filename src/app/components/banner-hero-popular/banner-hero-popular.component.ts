import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { Genre } from '../../interfaces/genre-movies-response.interface';
import { Movie } from '../../interfaces/movie-response.interface';
import { TagComponent } from '../../shared/tag/tag.component';
import { VoteComponent } from '../../shared/vote/vote.component';
import { PopularityComponent } from '../../shared/popularity/popularity.component';
import { GenreListComponent } from '../../shared/genre-list/genre-list.component';
import { BackdropImageComponent } from '../../shared/backdrop-image/backdrop-image.component';

@Component({
  selector: 'banner-hero-popular',
  imports: [
    TagComponent,
    VoteComponent,
    PopularityComponent,
    GenreListComponent,
    BackdropImageComponent,
    RouterLink
],
  templateUrl: './banner-hero-popular.component.html',
})
export class BannerHeroPopularComponent implements OnInit {
  genres = signal<Genre[]>([]);
  movie = signal<Movie>(Object.create({}));
  genresPopularMovie = computed<Genre[]>(() =>
    this.genres().filter(genre => this.movie().genre_ids.includes(genre.id))
  );
  private tmdbService = inject(TmdbService);

  ngOnInit(): void {
    this.getPopularMovies();
    this.getGenreList();
  }

  getPopularMovies() {
    this.tmdbService.getPopularMovies(1).subscribe(movie => this.movie.set(movie[0]));
  }

  getGenreList() {
    this.tmdbService.getGenreMovieList().subscribe(genres => this.genres.set(genres));
  }
}
