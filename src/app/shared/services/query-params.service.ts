import { computed, Injectable, signal } from '@angular/core';
import { QueryParams } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  private queryParams = signal<QueryParams | undefined>(undefined);
  getQueryParams = computed(() => this.queryParams());

  set(queryParams: QueryParams) {
    this.queryParams.set(queryParams);
  };
};
