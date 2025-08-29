import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DetailService } from './detail.service';
import { UserGeolocationService } from '@app/core/services';
import { environment } from '@environments/environment.developments';
import { Keyword, MovieCollectionResponse, MovieResponse, Trailer } from '@shared/interfaces';
import { mockMovieResponse, MockUserGeolocationService, mockKeywords, mockTrailers, mockCollection, MockUserGeolocationServiceUndefined } from '@app/testing';

describe('DetailService', () => {
  let detailService: DetailService;
  let httpClientMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        DetailService,
        { provide: UserGeolocationService, useClass: MockUserGeolocationService }
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
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          DetailService,
          { provide: UserGeolocationService, useClass: MockUserGeolocationServiceUndefined }
        ]
      });
      detailService = TestBed.inject(DetailService);
      httpClientMock = TestBed.inject(HttpTestingController);
    });

    it('userLanguage signal should be undefined.', () => {
      expect(detailService['userLanguage']()).toBeUndefined();
    });
  });
});
