import { Component, inject, OnInit, signal } from '@angular/core';
import { TmdbService } from '../../services/tmdb-service/tmdb.service';
import { Movie } from '../../interfaces/movie-response.interface';
import { CarruselMoviesComponent } from "../../shared/carrusel-movies/carrusel-movies.component";

@Component({
  selector: 'top-popular',
  imports: [ CarruselMoviesComponent ],
  template: `
    <carrusel-movies carruselTitle="Top 10 - Más populares" [movies]="movies()"/>
  `
})
export class TopPopularComponent implements OnInit {
  movies = signal<Movie[]>(Object.create({}));
  private tmdbService = inject(TmdbService);

  ngOnInit(): void {
    this.getPopularMovies();
  }

  getPopularMovies() {
    this.tmdbService.getPopularMovies(10).subscribe(movies => this.movies.set(movies));
  }
}
