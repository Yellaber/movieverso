import { Injectable, Signal, signal } from '@angular/core';
import { QueryParams } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  private queryParams = signal<QueryParams | undefined>(undefined);

  set(queryParams: QueryParams) {
    this.queryParams.set(queryParams);
  };

  get(): Signal<QueryParams | undefined> {
    return this.queryParams.asReadonly();
  };
}
