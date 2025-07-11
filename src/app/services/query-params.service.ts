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
  sortBy: 'primary_release_date.desc',
  voteCountGte: 0
};

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  private today: string = '';
  private cacheQueryParams = new Map<string, QueryParams>();

  constructor() {
    this.today = new Date().toISOString().split('T')[0];
  }

  set(key: string, queryParams: QueryParams) {
    this.cacheQueryParams.set(key, queryParams);
  };

  get(key: string): QueryParams {
    if(this.cacheQueryParams.has(key)) {
      return this.cacheQueryParams.get(key)!;
    }
    const queryParams = this.getInitialQueryParams(key);
    this.set(key, queryParams);
    return queryParams;
  };

  private getInitialQueryParams(key: string): QueryParams {
    return {
      ...initialQueryParams,
      primaryReleaseDateLte: this.today,
      sortBy: 'vote_count.desc'
    };
    /*switch(key) {
      case ComponentToFilter.nowPlaying:
        return {
          ...initialQueryParams,
          primaryReleaseDateLte: this.today,
          sortBy: 'vote_count.desc'
        };
      default:
        return {
          ...initialQueryParams,
          primaryReleaseDateGte: this.today,
        };
    }*/
  };
}
