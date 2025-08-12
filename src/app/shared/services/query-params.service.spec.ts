import { TestBed } from '@angular/core/testing';
import { QueryParamsService } from './query-params.service';
import { QueryParams } from '@shared/interfaces';

describe('QueryParamsService', () => {
  let service: QueryParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryParamsService]
    });
    service = TestBed.inject(QueryParamsService);
  });

  it('Should be created.', () => {
    expect(service).toBeTruthy();
  });

  it('Should have an initial value of undefined.', () => {
    expect(service.get()()).toBeUndefined();
  });

  it('Should set and get query params correctly.', () => {
    const mockParams: QueryParams = {
      query: 'Inception',
      sortBy: 'popularity.desc',
      withGenres: '28,878'
    };
    service.set(mockParams);
    expect(service.get()()).toEqual(mockParams);
  });

  it('Should update query params when set is called again.', () => {
    const initialParams: QueryParams = { query: 'Inception' };
    service.set(initialParams);
    expect(service.get()()).toEqual(initialParams);

    const updatedParams: QueryParams = {
      query: 'Dune',
      sortBy: 'primary_release_date.desc'
    };

    service.set(updatedParams);
    expect(service.get()()).toEqual(updatedParams);
  });
});
