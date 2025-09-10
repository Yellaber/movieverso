import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { UserGeolocationService } from '@app/core/services';
import { MovieResponse } from '@shared/interfaces';
import { environment } from '@environments/environment';
import { initialQueryParams } from '@shared/services/query-params.service';
import { mockGeolocation, mockMovieResponse } from '@app/testing';

describe('SearchService.', () => {
  let searchService: SearchService;
  let httpClientMock: HttpTestingController;

  beforeEach(() => {
    const userGeolocationServiceMock = { getUserGeolocation: jest.fn().mockReturnValue(mockGeolocation) };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        SearchService,
        { provide: UserGeolocationService, useValue: userGeolocationServiceMock }
      ]
    });
    searchService = TestBed.inject(SearchService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    httpClientMock.verify();
  });

  it('Should be created.', () => {
    expect(searchService).toBeTruthy();
  });

  it('Geolocation should be available.', () => {
    expect((searchService as any).userLanguage()).toBe('es-CO');
    expect((searchService as any).userCountry()).toBe('CO');
  });

  describe('getMovieByTitle().', () => {
    it('Should fetch movies by title and reset on page 1.', () => {
      const query = 'title';
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMovieByTitle(query, 1).subscribe(response => { moviesResponse = response; });
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/search/movie?api_key=${environment.tmdbApiKey}&query=${query}&language=es-CO&region=CO&page=1`);
      req.flush(mockMovieResponse);
      expect(moviesResponse).toEqual([mockMovieResponse]);
    });

    it('Should append movies when page > 1.', () => {
      const query = 'title';
      searchService.getMovieByTitle(query, 1).subscribe();
      const req1 = httpClientMock.expectOne(`${environment.tmdbApiUrl}/search/movie?api_key=${environment.tmdbApiKey}&query=${query}&language=es-CO&region=CO&page=1`);
      req1.flush(mockMovieResponse);
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMovieByTitle(query, 2).subscribe(response => { moviesResponse = response; });
      const req2 = httpClientMock.expectOne(`${environment.tmdbApiUrl}/search/movie?api_key=${environment.tmdbApiKey}&query=${query}&language=es-CO&region=CO&page=2`);
      req2.flush(mockMovieResponse);
      expect(moviesResponse?.length).toBe(2);
    });

    it('Should return empty array when page <= 0.', () => {
      const query = 'title';
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMovieByTitle(query, 0).subscribe(response => { moviesResponse = response; });
      expect(moviesResponse).toEqual([]);
    });
  });

  describe('getMoviesFiltered().', () => {
    it('Should fetch movies filtered and reset on page 1.', () => {
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMoviesFiltered(initialQueryParams, 1).subscribe(response => { moviesResponse = response; });
      const req = httpClientMock.expectOne(request => request.url === `${environment.tmdbApiUrl}/discover/movie`);
      const { params } = req.request;
      expect(params.get('sort_by')).toBe('popularity.desc');
      expect(params.get('vote_average.gte')).toBe('7');
      expect(params.get('vote_count.gte')).toBe('100');
      req.flush(mockMovieResponse);
      expect(moviesResponse).toEqual([mockMovieResponse]);
    });

    it('Should append movies when page > 1.', () => {
      searchService.getMoviesFiltered(initialQueryParams, 1).subscribe();
      const req1 = httpClientMock.expectOne(request => request.url === `${environment.tmdbApiUrl}/discover/movie`);
      expect(req1.request.params.get('sort_by')).toBe('popularity.desc');
      expect(req1.request.params.get('vote_average.gte')).toBe('7');
      expect(req1.request.params.get('vote_count.gte')).toBe('100');
      req1.flush(mockMovieResponse);
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMoviesFiltered(initialQueryParams, 2).subscribe(response => { moviesResponse = response; });
      const req2 = httpClientMock.expectOne(request => request.url === `${environment.tmdbApiUrl}/discover/movie`);
      expect(req2.request.params.get('sort_by')).toBe('popularity.desc');
      expect(req2.request.params.get('vote_average.gte')).toBe('7');
      expect(req2.request.params.get('vote_count.gte')).toBe('100');
      req2.flush(mockMovieResponse);
      expect(moviesResponse?.length).toBe(2);
    });

    it('Should return empty array when page <= 0.', () => {
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMoviesFiltered(initialQueryParams, 0).subscribe(response => { moviesResponse = response; });
      expect(moviesResponse).toEqual([]);
    });
  });

  describe('If geolocation is not available.', () => {
    beforeEach(() => {
      const userGeolocationServiceMock = { getUserGeolocation: jest.fn().mockReturnValue(undefined) };

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          SearchService,
          { provide: UserGeolocationService, useValue: userGeolocationServiceMock }
        ]
      });
      searchService = TestBed.inject(SearchService);
      httpClientMock = TestBed.inject(HttpTestingController);
    });

    it('userLanguage and userCountry signals should be empty string.', () => {
      expect((searchService as any).userLanguage()).toBe('');
      expect((searchService as any).userCountry()).toBe('');
    });
  });
});
