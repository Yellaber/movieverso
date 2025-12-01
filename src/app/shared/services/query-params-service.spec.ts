import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { initialQueryParams, QueryParamsService } from './query-params-service';
import { MockActivedRouteServiceWithoutParams, MockActivedRouteServiceWithParams, mockQueryParams } from '@mocks';

describe('QueryParamsService', () => {
  let service: QueryParamsService;
  let route: ActivatedRoute;

  describe('When active route contain query params.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          QueryParamsService,
          { provide: ActivatedRoute, useClass: MockActivedRouteServiceWithParams }
        ]
      });
      service = TestBed.inject(QueryParamsService);
      route = TestBed.inject(ActivatedRoute);
    })

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('Should be created and set the queryParams.', () => {
      expect(service).toBeTruthy();
      expect(service.getQueryParams()).not.toBe(initialQueryParams);
    })
  })

  describe('When active route not contain query params.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          QueryParamsService,
          { provide: ActivatedRoute, useClass: MockActivedRouteServiceWithoutParams }
        ]
      });
      service = TestBed.inject(QueryParamsService);
      route = TestBed.inject(ActivatedRoute);
    })

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('Should be created and set the initial queryParams.', () => {
      expect(service).toBeTruthy();
      expect(service.getQueryParams()).toStrictEqual(initialQueryParams);
    })
  })

  it('Should update the queryParams when set is called.', () => {
    service.set(mockQueryParams);
    expect(service.getQueryParams()).toBe(mockQueryParams);
  })

  it('Should return a readonly signal from getQueryParams.', () => {
    const readonlySignal = service.getQueryParams;
    expect((readonlySignal as any).set).toBeUndefined();
    expect((readonlySignal as any).update).toBeUndefined();
    expect((readonlySignal as any).mutate).toBeUndefined();
  })
})
