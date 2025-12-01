import { computed, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QueryParams, TypeSort } from '@interfaces';

export const initialQueryParams: QueryParams = {
  primaryReleaseDateGte: '',
  primaryReleaseDateLte: '',
  query: '',
  sortBy: 'popularity.desc',
  voteAverageGte: 7,
  voteCountGte: 100,
  withGenres: ''
};

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  private route = inject(ActivatedRoute);
  private queryParams = signal<QueryParams>(initialQueryParams);
  getQueryParams = computed(() => this.queryParams());

  constructor() {
    const queryParams = { ...this.queryParams() };
    this.route.paramMap.subscribe(params => {
      queryParams.primaryReleaseDateGte = this.getStringValue(params, 'primaryReleaseDateGte');
      queryParams.primaryReleaseDateLte = this.getStringValue(params, 'primaryReleaseDateLte');
      queryParams.query = this.getStringValue(params, 'query');
      queryParams.sortBy = this.getSortByValue(params);
      queryParams.voteAverageGte = this.getNumberValue(params, 'voteAverageGte');
      queryParams.voteCountGte = this.getNumberValue(params, 'voteCountGte');
      queryParams.withGenres = this.getStringValue(params, 'genres');
      this.queryParams.set(queryParams);
    });
  }

  private getStringValue(params: ParamMap, key: string): string {
    return params.has(key)? params.get(key)!: '';
  }

  private getNumberValue(params: ParamMap, key: string): number {
    switch(key) {
      case 'voteAverageGte':
        return params.has(key)? +params.get(key)!: 7;
      case 'voteCountGte':
        return params.has(key)? +params.get(key)!: 100;
      default:
        return 0;
    }
  }

  private getSortByValue(params: ParamMap): TypeSort {
    if(!params.has('sortBy') || params.get('sortBy') === '') {
      return 'popularity.desc';
    }
    return params.get('sortBy') as TypeSort;
  }

  set(queryParams: QueryParams) {
    this.queryParams.set(queryParams);
  }
}
