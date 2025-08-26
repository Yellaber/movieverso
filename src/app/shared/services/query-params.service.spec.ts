import { TestBed } from '@angular/core/testing';
import { initialQueryParams, QueryParamsService } from './query-params.service';
import { mockQueryParams } from '@app/testing';

describe('QueryParamsService', () => {
  let service: QueryParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ QueryParamsService ]
    });
    service = TestBed.inject(QueryParamsService);
  });

  it('Should be created and have an initial value.', () => {
    expect(service).toBeTruthy();
    expect(service.getQueryParams()).toBe(initialQueryParams);
  });

  it('Should update the queryParams when set is called.', () => {
    service.set(mockQueryParams);
    expect(service.getQueryParams()).toBe(mockQueryParams);
  });

  it('Should return a readonly signal from getQueryParams.', () => {
    const readonlySignal = service.getQueryParams;
    expect((readonlySignal as any).set).toBeUndefined();
    expect((readonlySignal as any).update).toBeUndefined();
    expect((readonlySignal as any).mutate).toBeUndefined();
  });
});
