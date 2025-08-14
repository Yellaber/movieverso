import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HomeService } from './home.service';
import { UserGeolocationService } from '@app/core/services';
import { environment } from '@environments/environment.developments';
import { Movie, MovieResponse, UserGeolocation } from '@shared/interfaces';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

const mockGeolocation: UserGeolocation = {
  ip: '1.2.3.4',
  location: {
    continent_code: 'SA',
    continent_name: 'Sounth America',
    country_code2: 'CO',
    country_code3: 'COL',
    country_name: 'Colombia',
    country_name_official: 'Republic of Colombia',
    country_capital: 'Bogota',
    state_prov: 'Bolivar',
    state_code: 'CO-BOL',
    district: 'Cartagena Province',
    city: 'Cartagena',
    zipcode: '130008',
    latitude: '10.48366',
    longitude: '-75.45778',
    is_eu: false,
    country_flag: 'https://ipgeolocation.io/static/flags/co_64.png',
    geoname_id: '3830557',
    country_emoji: 'co'
  },
  country_metadata: {
    calling_code: '+57',
    tld: '.co',
    languages: ['es-CO']
  },
  currency: {
    code: 'COP',
    name: 'Colombian Peso',
    symbol: '$'
  }
};

const mockMovies: Movie[] = [
  {
    adult: false,
    backdrop_path: '/backdrop.jpg',
    genre_ids: [1, 2],
    id: 1,
    original_language: 'es',
    original_title: 'Película',
    overview: 'Resumen',
    popularity: 10,
    poster_path: '/poster.jpg',
    release_date: new Date( '2024-01-01' ),
    title: 'Película',
    video: false,
    vote_average: 8.5,
    vote_count: 100
  }
];

const mockMovieResponse: MovieResponse = {
  page: 1,
  results: mockMovies,
  total_pages: 1,
  total_results: 1
};

describe('HomeService.', () => {
  let homeService: HomeService;
  let httpClientMock: HttpTestingController;

  beforeEach(() => {
    const userGeolocationService = { getUserGeolocation: jest.fn().mockReturnValue(mockGeolocation) };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HomeService,
        { provide: UserGeolocationService, useValue: userGeolocationService }
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
    expect((homeService as any).userLanguage()).toBe('es-CO');
    expect((homeService as any).userCountry()).toBe('CO');
  });

  describe('getMovies().', () => {
    it('Should fetch movies from API if cache is empty.', () => {
      const endPoint = 'top_rated';
      let moviesResponse: Movie[] | undefined;
      homeService.getMovies(endPoint).subscribe(response => { moviesResponse = response; });
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/${endPoint}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      req.flush(mockMovieResponse);
      expect(moviesResponse).toEqual(mockMovies);
    });

    it('Should return movies from cache if available.', () => {
      const endPoint = 'popular';
      homeService.getMovies(endPoint).subscribe();
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/${endPoint}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      req.flush(mockMovieResponse);
      let moviesResponse: Movie[] | undefined;
      homeService.getMovies(endPoint).subscribe(response => { moviesResponse = response; });
      httpClientMock.expectNone(`${environment.tmdbApiUrl}/${endPoint}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      expect(moviesResponse).toEqual(mockMovies);
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
          HomeService,
          { provide: UserGeolocationService, useValue: userGeolocationServiceMock }
        ]
      });
      homeService = TestBed.inject(HomeService);
      httpClientMock = TestBed.inject(HttpTestingController);
    });

    it('userLanguage and userCountry signals should be empty string.', () => {
      expect((homeService as any).userLanguage()).toBe('');
      expect((homeService as any).userCountry()).toBe('');
    });
  });
});
