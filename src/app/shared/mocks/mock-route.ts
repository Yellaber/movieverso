import { Component } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'stub-component',
  template: `<li>StubComponentTesting</li>`
})
export class StubComponentTesting {};

export const mockRoutes: Route[] = [
  { path: 'upcoming', component: StubComponentTesting }, { path: 'now-playing', component: StubComponentTesting },
  { path: 'popular', component: StubComponentTesting }, { path: 'top-rated', component: StubComponentTesting },
  { path: 'trending', component: StubComponentTesting }, { path: 'movie/:id-slug', component: StubComponentTesting }
];

export const mockUpdateRoutes: Route[] = [{ path: 'contact', title: 'Contact' }];

export class MockRoutesService {
  getRoutes = jest.fn().mockReturnValue(mockRoutes);
  setRoutes = jest.fn();
}

export class MockRouter {
  navigate = jest.fn();
}

export class MockActivedRoute {
  paramMap = {
    subscribe: (fn: (value: any) => void) => fn({
      get: (param: string) => {
        if(param === 'id-slug') {
          return '123-mock-movie-detail';
        }
        return null;
      }
    })
  };
}

export class MockActivedRouteServiceWithParams {
  paramMap = {
    subscribe: (fn: (value: any) => void) => fn({
      has: (key: string) => {
        switch(key) {
          case 'primaryReleaseDateGte':
            return true;
          case 'primaryReleaseDateLte':
            return true;
          case 'query':
            return true;
          case 'sortBy':
            return true;
          case 'voteAverageGte':
            return true;
          case 'voteCountGte':
            return true;
          case 'genres':
            return true;
          default:
            return false;
        }
      },
      get: (key: string) => {
        switch(key) {
          case 'primaryReleaseDateGte':
            return '2025-01-01';
          case 'primaryReleaseDateLte':
            return '2025-02-01';
          case 'query':
            return 'test';
          case 'sortBy':
            return 'vote_average.desc';
          case 'voteAverageGte':
            return '8';
          case 'voteCountGte':
            return '500';
          case 'genres':
            return '28';
          default:
            return '';
        }
      }
    })
  };
}

export class MockActivedRouteServiceWithoutParams {
  paramMap = {
    subscribe: (fn: (value: any) => void) => fn({
      has: (key: string) => {
        switch(key) {
          case 'primaryReleaseDateGte':
            return false;
          case 'primaryReleaseDateLte':
            return false;
          case 'query':
            return false;
          case 'sortBy':
            return false;
          case 'voteAverageGte':
            return false;
          case 'voteCountGte':
            return false;
          case 'genres':
            return false;
          default:
            return true;
        }
      },
      get: (key: string) => {
        switch(key) {
          case 'primaryReleaseDateGte':
            return '';
          case 'primaryReleaseDateLte':
            return '';
          case 'query':
            return '';
          case 'sortBy':
            return 'popularity.desc';
          case 'voteAverageGte':
            return '7';
          case 'voteCountGte':
            return '100';
          case 'genres':
            return '';
          default:
            return '';
        }
      }
    })
  };
}
