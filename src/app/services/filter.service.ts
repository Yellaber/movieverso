import { Injectable, signal } from '@angular/core';
import { Genre } from '@interfaces/';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private genresUpcomingMoviesFiltered = signal<Genre[]>([]);

  setGenresUpcomingMoviesFiltered(genresSelected: Genre[]) {
    this.genresUpcomingMoviesFiltered.set(genresSelected)
  };

  getGenresUpcomingMoviesFiltered(): Genre[] {
    return this.genresUpcomingMoviesFiltered();
  };
}
