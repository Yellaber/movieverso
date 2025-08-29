import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HomeService } from './home.service';
import { UserGeolocationService } from '@app/core/services';
import { environment } from '@environments/environment.developments';
import { Movie } from '@shared/interfaces';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockMovieResponse, MockUserGeolocationService, MockUserGeolocationServiceUndefined } from '@app/testing';

describe('HomeService.', () => {
  let homeService: HomeService;
  let httpClientMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HomeService,
        { provide: UserGeolocationService, useClass: MockUserGeolocationService }
      ]
    });

    homeService = TestBed.inject(HomeService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    httpClientMock.verify();
  });

  it('Should be created and set language/country from geolocation.', () => {
    expect(homeService).toBeTruthy();
    expect(homeService['userLanguage']()).toBe('es-CO');
    expect(homeService['userCountry']()).toBe('CO');
  });

  describe('getMovies().', () => {
    it('Should fetch movies from API if cache is empty.', () => {
      const endPoint = 'top_rated';
      let moviesResponse: Movie[] | undefined;
      homeService.getMovies(endPoint).subscribe(response => moviesResponse = response);
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/${endPoint}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      req.flush(mockMovieResponse);
      expect(moviesResponse).toEqual(mockMovieResponse.results);
    });

    it('Should return movies from cache if available.', () => {
      const endPoint = 'popular';
      homeService.getMovies(endPoint).subscribe();
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/${endPoint}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      req.flush(mockMovieResponse);
      let moviesResponse: Movie[] | undefined;
      homeService.getMovies(endPoint).subscribe(response => moviesResponse = response);
      httpClientMock.expectNone(`${environment.tmdbApiUrl}/${endPoint}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      expect(moviesResponse).toEqual(mockMovieResponse.results);
    });
  });

  describe('If geolocation is not available.', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          HomeService,
          { provide: UserGeolocationService, useClass: MockUserGeolocationServiceUndefined }
        ]
      });
      homeService = TestBed.inject(HomeService);
      httpClientMock = TestBed.inject(HttpTestingController);
    });

    it('userLanguage and userCountry signals should be an empty string.', () => {
      expect(homeService['userLanguage']()).toBe('');
      expect(homeService['userCountry']()).toBe('');
    });
  });
});
