import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HomeService } from './home.service';
import { UserGeolocationService } from '@app/core/services';
import { environment } from '@environments/environment.developments';
import { Movie, MovieResponse } from '@shared/interfaces';

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

describe('HomeService', () => {
  let service: HomeService;
  let httpClient: { get: jest.Mock };
  let userGeolocationService: { getUserGeolocation: jest.Mock };

  beforeEach(() => {
    httpClient = { get: jest.fn() };
    userGeolocationService = {
      getUserGeolocation: jest.fn().mockReturnValue({
        country_metadata: { languages: ['es-ES'] },
        location: { country_code2: 'ES' }
      })
    };

    TestBed.configureTestingModule({
      providers: [
        HomeService,
        { provide: HttpClient, useValue: httpClient },
        { provide: UserGeolocationService, useValue: userGeolocationService }
      ]
    });

    service = TestBed.inject(HomeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be created and set language/country from geolocation.', () => {
    expect(service).toBeTruthy();
    expect(service['userLanguage']()).toBe('es-ES');
    expect(service['userCountry']()).toBe('ES');
  });

  it('Should return movies from cache if present.', (done) => {
    const endPoint = 'popular';
    const url = `${environment.tmdbApiUrl}/${endPoint}`;
    const key = `${url}/page=1`;
    service['cacheQuery'].set(key, mockMovies);

    service.getMovies(endPoint).subscribe(result => {
      expect(result).toBe(mockMovies);
      done();
    });
  });

  it('Should fetch movies from API and cache them if not in cache.', (done) => {
    const endPoint = 'top_rated';
    const url = `${environment.tmdbApiUrl}/${endPoint}`;
    httpClient.get.mockReturnValue(of(mockMovieResponse));

    service.getMovies(endPoint).subscribe(result => {
      expect(httpClient.get).toHaveBeenCalledWith(url, {
        params: {
          api_key: environment.tmdbApiKey,
          language: 'es-ES',
          region: 'ES',
          page: 1
        }
      });
      expect(result).toEqual(mockMovies);
      expect(service['cacheQuery'].get(`${url}/page=1`)).toEqual(mockMovies);
      done();
    });
  });
});
