import { Injectable } from '@angular/core';
import { QueryParams } from '@interfaces/';

const initialQueryParams: QueryParams = {
  withGenres: [],
  withOriginalLanguage: '',
  primaryReleaseYear: new Date().getFullYear(),
  voteAverageGte: 0,
  withOriginCountry: '',
  primaryReleaseDateGte: '',
  primaryReleaseDateLte: '',
  withCompanies: '',
  releaseDateGte: '',
  sortBy: 'primary_release_date.asc',
  voteCountGte: 0
};

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private today: string = '';
  private cacheQueryParams = new Map<string, QueryParams>();

  constructor() {
    this.today = new Date().toISOString().split('T')[0];
  }

  setQueryParams(key: string, queryParams: QueryParams) {
    this.cacheQueryParams.set(key, queryParams);
  };

  getQueryParams(key: string): QueryParams {
    if(this.cacheQueryParams.has(key)) {
      return this.cacheQueryParams.get(key)!;
    }
    const queryParams = this.getInitialQueryParams(key);
    this.setQueryParams(key, queryParams);
    return queryParams;
  };

  getInitialQueryParams(key: string): QueryParams {
    switch(key) {
      case 'released':
        return {
          ...initialQueryParams,
          primaryReleaseDateLte: this.today,
          sortBy: 'primary_release_date.desc'
        };
      default:
        return {
          ...initialQueryParams,
          primaryReleaseDateGte: this.today,
        };
    }
  };
}
