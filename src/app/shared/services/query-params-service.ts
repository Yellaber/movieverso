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
    this.route.paramMap.subscribe(params => {
      this.queryParams.set({
        primaryReleaseDateGte: this.getStringValue(params, 'primaryReleaseDateGte'),
        primaryReleaseDateLte: this.getStringValue(params, 'primaryReleaseDateLte'),
        query:                 this.getStringValue(params, 'query'),
        sortBy:                this.getSortByValue(params),
        voteAverageGte:        this.getNumberValue(params, 'voteAverageGte'),
        voteCountGte:          this.getNumberValue(params, 'voteCountGte'),
        withGenres:            this.getStringValue(params, 'genres'),
      });
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
