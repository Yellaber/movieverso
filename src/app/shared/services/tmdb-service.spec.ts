import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TmdbService } from './tmdb-service';
import { UserGeolocationService } from './user-geolocation-service';
import { environment } from '@environments/environment';
import { Genre, PaginatedMovies, DetailMovie } from '@interfaces';
import { mockDetailMovie, mockGenreMovies, mockPaginatedMovies, MockUserGeolocationService } from '@mocks';

describe('TmdbService', () => {
  let service: TmdbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TmdbService,
        { provide: UserGeolocationService, useClass: MockUserGeolocationService }
      ]
    });
    service = TestBed.inject(TmdbService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    jest.clearAllMocks();
    httpMock.verify();
  })

  it('Should be created and set language/country from geolocation.', () => {
    expect(service).toBeTruthy();
    expect((service as any).userLanguage()).toBe('es-CO');
    expect((service as any).userCountry()).toBe('CO');
  })

  describe('getPaginatedMoviesByCategory().', () => {
    it('Should fetch movies for a given category when page == 1 and cache is not present.', () => {
      const category = 'popular';
      let paginatedMovies: PaginatedMovies[] | undefined;
      service.getPaginatedMoviesByCategory(category, 1).subscribe(response => { paginatedMovies = response; });
      const req = httpMock.expectOne(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      req.flush(mockPaginatedMovies);
      expect(paginatedMovies).toHaveLength(1);
    })

    it('Should return movies from cache when page == 1.', () => {
      const category = 'popular';
      service.getPaginatedMoviesByCategory(category, 1).subscribe();
      const req1 = httpMock.expectOne(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      req1.flush(mockPaginatedMovies);
      let paginatedMovies: PaginatedMovies[] | undefined;
      service.getPaginatedMoviesByCategory(category, 1).subscribe(response => { paginatedMovies = response; });
      httpMock.expectNone(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      expect(paginatedMovies).toHaveLength(1);
    })

    it('Should return movies from cache when page is least than the length of paginatedMovies.', () => {
      const category = 'popular';
      service.getPaginatedMoviesByCategory(category, 1).subscribe();
      const req1 = httpMock.expectOne(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      req1.flush(mockPaginatedMovies);
      service.getPaginatedMoviesByCategory(category, 2).subscribe();
      const req2 = httpMock.expectOne(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=2`);
      req2.flush(mockPaginatedMovies);
      service.getPaginatedMoviesByCategory(category, 1).subscribe();
      httpMock.expectNone(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=1`);
      let paginatedMovies: PaginatedMovies[] | undefined;
      service.getPaginatedMoviesByCategory(category, 2).subscribe(response => { paginatedMovies = response; });
      httpMock.expectNone(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=es-CO&region=CO&page=2`);
      expect(paginatedMovies).toHaveLength(2);
    })

    it('Should return an empty array when page <= 0.', () => {
      const category = 'popular';
      let paginatedMovies: PaginatedMovies[] | undefined;
      service.getPaginatedMoviesByCategory(category, 0).subscribe(response => { paginatedMovies = response; });
      expect(paginatedMovies).toEqual([]);
    })
  })

  describe('getGenresMovieByIds().', () => {
    it('Should fetch and filter genres by ids.', () => {
      const genreIds = [1, 3];
      const expectedGenres = [{ id: 1, name: 'Genre 1' }, { id: 3, name: 'Genre 3' }];
      let genresResponse: Genre[] | undefined;
      service.getGenresMovieByIds(genreIds).subscribe(response => { genresResponse = response; });
      const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush(mockGenreMovies);
      expect(genresResponse).toEqual(expectedGenres);
    })

    it('Should return genres from cache on second call.', () => {
      const genreIds = [1, 3];
      const expectedGenres = [{ id: 1, name: 'Genre 1' }, { id: 3, name: 'Genre 3' }];
      service.getGenresMovieByIds(genreIds).subscribe();
      const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush(mockGenreMovies);
      let genresResponse: Genre[] | undefined;
      service.getGenresMovieByIds(genreIds).subscribe(response => { genresResponse = response; });
      httpMock.expectNone(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=es-CO`);
      expect(genresResponse).toEqual(expectedGenres);
    })
  })

  describe('getDetailMovieById().', () => {
    it('Should fetch a movie by its ID.', () => {
      const movieId = 123;
      service.getDetailMovieById(movieId).subscribe(movie => {
        expect(movie).toEqual(mockDetailMovie);
      });
      const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush(mockDetailMovie);
    })

    it('Should return movie from cache on second call.', () => {
      const movieId = 123;
      service.getDetailMovieById(movieId).subscribe();
      const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush(mockDetailMovie);
      let detailMovie: DetailMovie | undefined;
      service.getDetailMovieById(movieId).subscribe(response => { detailMovie = response; });
      httpMock.expectNone(`${environment.tmdbApiUrl}/movie/${movieId}?api_key=${environment.tmdbApiKey}&language=es-CO`);
      expect(detailMovie).toEqual(mockDetailMovie);
    })
  })

  describe('getGenresMovie().', () => {
    it('Should fetch and sort the full genre list.', () => {
      const unsorted = { genres: [{ id: 35, name: 'Comedy' }, { id: 28, name: 'Action' }]};
      const sorted = [{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }];
      let genresResponse: Genre[] | undefined;
      service.getGenresMovie().subscribe(response => { genresResponse = response; });
      const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush(unsorted);
      expect(genresResponse).toEqual(sorted);
    })

    it('Should return genres from cache on second call.', () => {
      service.getGenresMovie().subscribe();
      const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush(mockGenreMovies);
      let genresResponse: Genre[] | undefined;
      service.getGenresMovie().subscribe(response => { genresResponse = response; });
      httpMock.expectNone(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=es-CO`);
      expect(genresResponse).toEqual(mockGenreMovies.genres);
    })

    it('Should handle empty genre list.', () => {
      let genresResponse: Genre[] | undefined;
      service.getGenresMovie().subscribe(response => { genresResponse = response; });
      const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=es-CO`);
      req.flush({ genres: [] });
      expect(genresResponse).toEqual([]);
    })
  })

  describe('getPaginatedMoviesBasedIn().', () => {
    it('Should fetch movies for a given movieId and basedIn when page == 1 and cache is not present.', () => {
      const basedIn = 'recommendations';
      const movieId = 123;
      let paginatedMovies: PaginatedMovies[] | undefined;
      service.getPaginatedMoviesBasedIn(basedIn, movieId, 1).subscribe(response => { paginatedMovies = response; });
      const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=es-CO&page=1`);
      req.flush(mockPaginatedMovies);
      expect(paginatedMovies).toEqual([mockPaginatedMovies]);
    })

    it('Should return movies from cache when page == 1.', () => {
      const basedIn = 'recommendations';
      const movieId = 123;
      service.getPaginatedMoviesBasedIn(basedIn, movieId, 1).subscribe();
      const req1 = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=es-CO&page=1`);
      req1.flush(mockPaginatedMovies);
      let paginatedMovies: PaginatedMovies[] | undefined;
      service.getPaginatedMoviesBasedIn(basedIn, movieId, 1).subscribe(response => { paginatedMovies = response; });
      httpMock.expectNone(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=es-CO&page=1`);
      expect(paginatedMovies).toHaveLength(1);
    })

    it('Should return movies from cache when page is least than the length of paginatedMovies.', () => {
      const basedIn = 'recommendations';
      const movieId = 123;
      service.getPaginatedMoviesBasedIn(basedIn, movieId, 1).subscribe();
      const req1 = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=es-CO&page=1`);
      req1.flush(mockPaginatedMovies);
      service.getPaginatedMoviesBasedIn(basedIn, movieId, 2).subscribe();
      const req2 = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=es-CO&page=2`);
      req2.flush(mockPaginatedMovies);
      service.getPaginatedMoviesBasedIn(basedIn, movieId, 1).subscribe();
      httpMock.expectNone(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=es-CO&page=1`);
      let paginatedMovies: PaginatedMovies[] | undefined;
      service.getPaginatedMoviesBasedIn(basedIn, movieId, 2).subscribe(response => { paginatedMovies = response; });
      httpMock.expectNone(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=es-CO&page=2`);
      expect(paginatedMovies).toHaveLength(2);
    })

    it('Should return an empty array when page <= 0.', () => {
      const basedIn = 'recommendations';
      const movieId = 123;
      let paginatedMovies: PaginatedMovies[] | undefined;
      service.getPaginatedMoviesBasedIn(basedIn, movieId, 0).subscribe(response => { paginatedMovies = response; });
      expect(paginatedMovies).toEqual([]);
    })
  })

  describe('If geolocation is not available.', () => {
    beforeEach(() => {
      const userGeolocationServiceMock = { getUserGeolocation: jest.fn().mockReturnValue(undefined) };

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          TmdbService,
          { provide: UserGeolocationService, useValue: userGeolocationServiceMock }
        ]
      });
      service = TestBed.inject(TmdbService);
      httpMock = TestBed.inject(HttpTestingController);
    })

    it('userLanguage and userCountry signals should be an empty string.', () => {
      expect(service['userLanguage']()).toBe('');
      expect(service['userCountry']()).toBe('');
    })
  })
})
