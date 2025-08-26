import { computed, Injectable, signal } from '@angular/core';
import { QueryParams } from '@shared/interfaces';

export const initialQueryParams: QueryParams = {
  primaryReleaseDateGte: '',
  primaryReleaseDateLte: '',
  query: '',
  sortBy: 'popularity.desc',
  voteAverageGte: 7,
  voteCountGte: 100,
  withGenres: '',
};

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  private queryParams = signal<QueryParams>(initialQueryParams);
  getQueryParams = computed(() => this.queryParams());

  set(queryParams: QueryParams) {
    this.queryParams.set(queryParams);
  };
};
