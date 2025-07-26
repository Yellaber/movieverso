import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { DetailService } from './detail.service';
import { UserGeolocationService } from '@app/core/services';
import { environment } from '@environments/environment.developments';

const mockKeywords = [
  {
    id: 1,
    name: 'action'
  }
];

const mockTrailers = [
  {
    iso_639_1: 'es',
    iso_3166_1: 'ES',
    name: 'Trailer',
    key: 'trailer-key',
    published_at: new Date(),
    site: 'YouTube',
    size: 1080,
    type: 'Trailer',
    official: true,
    id: 'abc'
  }
];

const mockMovieResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 1
};

const mockCollection = {
  id: 1,
  name: 'Collection',
  overview: 'Some overview',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  parts: [
    {
      backdrop_path: '/backdrop.jpg',
      id: 10,
      title: 'Part 1',
      original_title: 'Part 1 Original',
      overview: 'Overview part 1',
      poster_path: '/poster1.jpg',
      media_type: 'movie',
      adult: false,
      original_language: 'es',
      genre_ids: [1, 2],
      popularity: 10,
      release_date: new Date(),
      video: false,
      vote_average: 8.5,
      vote_count: 100
    }
  ]
};

describe('DetailService', () => {
  let service: DetailService;
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
        DetailService,
        { provide: HttpClient, useValue: httpClient },
        { provide: UserGeolocationService, useValue: userGeolocationService }
      ]
    });

    service = TestBed.inject(DetailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be created and set language/country from geolocation.', () => {
    expect(service).toBeTruthy();
    expect(service['userLanguage']()).toBe('es-ES');
    expect(service['userCountry']()).toBe('ES');
  });

  describe('getMovieKeywords', () => {
    it('Should return from cache if present.', (done) => {
      service['cacheQuery'].set(`${environment.tmdbApiUrl}/movie/1/keywords`, mockKeywords);
      service.getMovieKeywords(1).subscribe(result => {
        expect(result).toBe(mockKeywords);
        done();
      });
    });

    it('Should fetch and cache keywords if not in cache.', (done) => {
      httpClient.get.mockReturnValue(of({ keywords: mockKeywords }));
      service.getMovieKeywords(2).subscribe(result => {
        expect(httpClient.get).toHaveBeenCalled();
        expect(result).toEqual(mockKeywords);
        expect(service['cacheQuery'].get(`${environment.tmdbApiUrl}/movie/2/keywords`)).toEqual(mockKeywords);
        done();
      });
    });
  });

  describe('getMovieTrailers', () => {
    it('Should return from cache if present.', (done) => {
      service['cacheQuery'].set(`${environment.tmdbApiUrl}/movie/1/videos`, mockTrailers);
      service.getMovieTrailers(1).subscribe(result => {
        expect(result).toBe(mockTrailers);
        done();
      });
    });

    it('Should fetch and cache trailers if not in cache.', (done) => {
      httpClient.get.mockReturnValue(of({ results: mockTrailers }));
      service.getMovieTrailers(2).subscribe(result => {
        expect(httpClient.get).toHaveBeenCalled();
        expect(result).toEqual(mockTrailers);
        expect(service['cacheQuery'].get(`${environment.tmdbApiUrl}/movie/2/videos`)).toEqual(mockTrailers);
        done();
      });
    });
  });

  describe('getRelationedMovies', () => {
    it('Should return from cache if present.', (done) => {
      service['cacheQuery'].set(`${environment.tmdbApiUrl}/movie/1/similar`, mockMovieResponse);
      service.getRelationedMovies('similar', 1).subscribe(result => {
        expect(result).toBe(mockMovieResponse);
        done();
      });
    });

    it('Should fetch and cache relationed movies if not in cache.', (done) => {
      httpClient.get.mockReturnValue(of(mockMovieResponse));
      service.getRelationedMovies('similar', 2, 1).subscribe(result => {
        expect(httpClient.get).toHaveBeenCalled();
        expect(result).toEqual(mockMovieResponse);
        expect(service['cacheQuery'].get(`${environment.tmdbApiUrl}/movie/2/similar`)).toEqual(mockMovieResponse);
        done();
      });
    });
  });

  describe('getMovieCollectionById', () => {
    it('Should return from cache if present.', (done) => {
      service['cacheQuery'].set(`${environment.tmdbApiUrl}/collection/1`, mockCollection);
      service.getMovieCollectionById(1).subscribe(result => {
        expect(result).toBe(mockCollection);
        done();
      });
    });

    it('Should fetch and cache collection if not in cache.', (done) => {
      httpClient.get.mockReturnValue(of(mockCollection));
      service.getMovieCollectionById(2).subscribe(result => {
        expect(httpClient.get).toHaveBeenCalled();
        expect(result).toEqual(mockCollection);
        expect(service['cacheQuery'].get(`${environment.tmdbApiUrl}/collection/2`)).toEqual(mockCollection);
        done();
      });
    });
  });
});
