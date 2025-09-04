import { computed, Injectable, signal } from '@angular/core';
import { MovieResponse } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollService {
  private moviesResponse = signal<MovieResponse[] | undefined>(undefined);
  private page = signal<number>(1);
  getPage = computed(() => this.page());

  setMoviesResponse(moviesResponse: MovieResponse[]) {
    this.moviesResponse.set(moviesResponse);
  };

  nextPage() {
    const responses = this.moviesResponse();
    if(responses && responses.length > 0) {
      const lastResponse = responses[responses.length - 1];
      if(this.page() < lastResponse.total_pages) {
        this.page.update(value => value + 1);
      }
    }
  };

  reset() {
    this.page.set(1);
    this.moviesResponse.set(undefined);
  };
};
