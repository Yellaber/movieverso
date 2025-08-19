import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DetailService } from './detail.service';
import { UserGeolocationService } from '@app/core/services';
import { environment } from '@environments/environment.developments';
import { Keyword, MovieCollectionResponse, MovieResponse, Trailer } from '@shared/interfaces';
import { mockMovieResponse, mockGeolocation } from '@app/testing';

const mockKeywords: Keyword[] = [
  { id: 1, name: 'keyword 1' }, { id: 2, name: 'keyword 2' },
  { id: 3, name: 'keyword 3' }, { id: 4, name: 'keyword 4' }
];

const mockTrailers: Trailer[] = [
  {
    iso_639_1: 'es',
    iso_3166_1: 'ES',
    name: 'Trailer',
    key: 'trailer-key',
    published_at: new Date( '2025-01-01' ),
    site: 'YouTube',
    size: 1080,
    type: 'Trailer',
    official: true,
    id: 'abc'
  }
];

const mockCollection: MovieCollectionResponse = {
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
      release_date: new Date( '2025-01-01' ),
      video: false,
      vote_average: 8.5,
      vote_count: 100
    }
  ]
};

describe('DetailService', () => {
  let detailService: DetailService;
  let httpClientMock: HttpTestingController;

  beforeEach(() => {
    const userGeolocationService = { getUserGeolocation: jest.fn().mockReturnValue(mockGeolocation) };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        DetailService,
        { provide: UserGeolocationService, useValue: userGeolocationService }
      ]
    });

    detailService = TestBed.inject(DetailService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    httpClientMock.verify();
  });

  it('Should be created and set language/country from geolocation.', () => {
    expect(detailService).toBeTruthy();
    expect(detailService['userLanguage']()).toBe('es-CO');
    expect(detailService['userCountry']()).toBe('CO');
  });

  describe('getMovieKeywords().', () => {
    it('Should fetch movies from API if cache is empty.', () => {
      const movieId = 1;
      let keywordsResponse: Keyword[] | undefined;
      detailService.getMovieKeywords(movieId).subscribe(response => { keywordsResponse = response; });
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/keywords?api_key=${environment.tmdbApiKey}`);
      req.flush({ keywords: mockKeywords });
      expect(keywordsResponse).toEqual(mockKeywords);
    });

    it('Should return movies from cache if available.', () => {
      const movieId = 1;
      detailService.getMovieKeywords(movieId).subscribe();
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/keywords?api_key=${environment.tmdbApiKey}`);
      req.flush({ keywords: mockKeywords });
      let keywordsResponse: Keyword[] | undefined;
      detailService.getMovieKeywords(movieId).subscribe(response => { keywordsResponse = response; });
      httpClientMock.expectNone(`${environment.tmdbApiUrl}/movie/${movieId}/keywords?api_key=${environment.tmdbApiKey}`);
      expect(keywordsResponse).toEqual(mockKeywords);
    });
  });

  describe('getMovieTrailers().', () => {
    it('Should fetch movies from API if cache is empty.', () => {
      const movieId = 1;
      let trailersResponse: Trailer[] | undefined;
      detailService.getMovieTrailers(movieId).subscribe(response => { trailersResponse = response; });
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/videos?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush({ results: mockTrailers });
      expect(trailersResponse).toEqual(mockTrailers);
    });

    it('Should return movies from cache if available.', () => {
      const movieId = 1;
      detailService.getMovieTrailers(movieId).subscribe();
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/videos?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush({ results: mockTrailers });
      let trailersResponse: Trailer[] | undefined;
      detailService.getMovieTrailers(movieId).subscribe(response => { trailersResponse = response; });
      httpClientMock.expectNone(`${environment.tmdbApiUrl}/movie/${movieId}/videos?api_key=${environment.tmdbApiKey}&language=es-CO`);
      expect(trailersResponse).toEqual(mockTrailers);
    });
  });

  describe('getRelationedMovies().', () => {
    it('Should fetch movies from API if cache is empty.', () => {
      const relation = 'similar';
      const movieId = 1;
      let movieResponse: MovieResponse | undefined;
      detailService.getRelationedMovies(relation, movieId).subscribe(response => { movieResponse = response; });
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${relation}?api_key=${environment.tmdbApiKey}&language=es-CO&page=1`);
      req.flush(mockMovieResponse);
      expect(movieResponse).toEqual(mockMovieResponse);
    });

    it('Should return movies from cache if available.', () => {
      const relation = 'similar';
      const movieId = 1;
      detailService.getRelationedMovies(relation, movieId).subscribe();
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${relation}?api_key=${environment.tmdbApiKey}&language=es-CO&page=1`);
      req.flush(mockMovieResponse);
      let movieResponse: MovieResponse | undefined;
      detailService.getRelationedMovies(relation, movieId).subscribe(response => { movieResponse = response; });
      httpClientMock.expectNone(`${environment.tmdbApiUrl}/movie/${movieId}/${relation}?api_key=${environment.tmdbApiKey}&language=es-CO&page=1`);
      expect(movieResponse).toEqual(mockMovieResponse);
    });
  });

  describe('getMovieCollectionById().', () => {
    it('Should fetch movies from API if cache is empty.', () => {
      const collectionId = 1;
      let collectionResponse: MovieCollectionResponse | undefined;
      detailService.getMovieCollectionById(collectionId).subscribe(response => { collectionResponse = response; });
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/collection/${collectionId}?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush(mockCollection);
      expect(collectionResponse).toEqual(mockCollection);
    });

    it('Should return movies from cache if available.', () => {
      const collectionId = 1;
      detailService.getMovieCollectionById(collectionId).subscribe();
      const req = httpClientMock.expectOne(`${environment.tmdbApiUrl}/collection/${collectionId}?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush(mockCollection);
      let collectionResponse: MovieCollectionResponse | undefined;
      detailService.getMovieCollectionById(collectionId).subscribe( response => { collectionResponse = response; });
      httpClientMock.expectNone(`${environment.tmdbApiUrl}/collection/${collectionId}?api_key=${environment.tmdbApiKey}&language=es-CO`);
      expect(collectionResponse).toEqual(mockCollection);
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
          DetailService,
          { provide: UserGeolocationService, useValue: userGeolocationServiceMock }
        ]
      });
      detailService = TestBed.inject(DetailService);
      httpClientMock = TestBed.inject(HttpTestingController);
    });

    it('userLanguage and userCountry signals should be empty string.', () => {
      expect((detailService as any).userLanguage()).toBe('');
      expect((detailService as any).userCountry()).toBe('');
    });
  });
});
