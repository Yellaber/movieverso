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
    expect(service.getQueryParams()).toBeUndefined();
  });

  it('Should set and get query params correctly.', () => {
    const mockParams: QueryParams = {
      query: 'Inception',
      sortBy: 'popularity.desc',
      withGenres: '28,878'
    };
    service.set(mockParams);
    expect(service.getQueryParams()).toEqual(mockParams);
  });

  it('Should update query params when set is called again.', () => {
    const initialParams: QueryParams = { query: 'Inception' };
    service.set(initialParams);
    expect(service.getQueryParams()).toEqual(initialParams);

    const updatedParams: QueryParams = {
      query: 'Dune',
      sortBy: 'primary_release_date.desc'
    };

    service.set(updatedParams);
    expect(service.getQueryParams()).toEqual(updatedParams);
  });

  it('Should return a readonly signal.', () => {
    const readonlySignal = service.getQueryParams;
    expect((readonlySignal as any).set).toBeUndefined();
    expect((readonlySignal as any).update).toBeUndefined();
    expect((readonlySignal as any).mutate).toBeUndefined();
  });
});
