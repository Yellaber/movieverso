import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { initialQueryParams, QueryParamsService } from './query-params-service';
import { MockActivedRouteServiceWithoutParams, MockActivedRouteServiceWithParams, mockQueryParams } from '@mocks';

const makeParamMap = (data: Record<string, string>) => ({
  has: (key: string) => key in data,
  get: (key: string) => data[key] ?? null,
});

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

  describe('getNumberValue() — individual values.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          QueryParamsService,
          { provide: ActivatedRoute, useClass: MockActivedRouteServiceWithoutParams }
        ]
      });
      service = TestBed.inject(QueryParamsService);
    })

    it('Should return 7 for voteAverageGte when param is absent.', () => {
      expect(service['getNumberValue'](makeParamMap({}) as any, 'voteAverageGte')).toBe(7);
    })

    it('Should return 100 for voteCountGte when param is absent.', () => {
      expect(service['getNumberValue'](makeParamMap({}) as any, 'voteCountGte')).toBe(100);
    })

    it('Should return 0 for unknown keys.', () => {
      expect(service['getNumberValue'](makeParamMap({}) as any, 'unknown')).toBe(0);
    })

    it('Should parse voteAverageGte from params correctly.', () => {
      expect(service['getNumberValue'](makeParamMap({ voteAverageGte: '8' }) as any, 'voteAverageGte')).toBe(8);
    })

    it('Should parse voteCountGte from params correctly.', () => {
      expect(service['getNumberValue'](makeParamMap({ voteCountGte: '500' }) as any, 'voteCountGte')).toBe(500);
    })
  })

  describe('getSortByValue() — edge cases.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          QueryParamsService,
          { provide: ActivatedRoute, useClass: MockActivedRouteServiceWithoutParams }
        ]
      });
      service = TestBed.inject(QueryParamsService);
    })

    it('Should return "popularity.desc" when sortBy param is empty string.', () => {
      expect(service['getSortByValue'](makeParamMap({ sortBy: '' }) as any)).toBe('popularity.desc');
    })

    it('Should return "popularity.desc" when sortBy param is absent.', () => {
      expect(service['getSortByValue'](makeParamMap({}) as any)).toBe('popularity.desc');
    })

    it('Should return the provided sortBy value when present.', () => {
      expect(service['getSortByValue'](makeParamMap({ sortBy: 'vote_average.desc' }) as any)).toBe('vote_average.desc');
    })
  })

  describe('getStringValue() — edge cases.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          QueryParamsService,
          { provide: ActivatedRoute, useClass: MockActivedRouteServiceWithoutParams }
        ]
      });
      service = TestBed.inject(QueryParamsService);
    })

    it('Should return empty string when param is absent.', () => {
      expect(service['getStringValue'](makeParamMap({}) as any, 'query')).toBe('');
    })

    it('Should return the param value when present.', () => {
      expect(service['getStringValue'](makeParamMap({ query: 'test' }) as any, 'query')).toBe('test');
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
