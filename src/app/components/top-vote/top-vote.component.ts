import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TmdbService } from '../../services/tmdb-service/tmdb.service';
import { Movie } from '../../interfaces/movie-response.interface';
import { CarruselMoviesComponent } from '../../shared/carrusel-movies/carrusel-movies.component';

@Component({
  selector: 'top-vote',
  imports: [ CarruselMoviesComponent ],
  template: `
    <carrusel-movies carruselTitle="Top 10 - Mejor valoradas" [movies]="movies()"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopVoteComponent implements OnInit {
  movies = signal<Movie[]>(Object.create({}));
  private tmdbService = inject(TmdbService);

  ngOnInit(): void {
    this.getTopRatedMovies();
  }

  getTopRatedMovies() {
    this.tmdbService.getTopRatedMovies(10).subscribe(movies => this.movies.set(movies));
  }
}
