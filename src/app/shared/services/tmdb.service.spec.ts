import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TmdbService } from './tmdb.service';
import { UserGeolocationService } from '../../core/services/user-geolocation.service';
import { environment } from '@environments/environment.developments';
import { Genre, GenreMoviesResponse, MovieResponse, DetailMovieResponse, UserGeolocation, Movie } from '@shared/interfaces';

const mockUserGeolocation: UserGeolocation = {
  ip: '127.0.0.1',
  location: {} as any,
  country_metadata: {} as any,
  currency: {} as any
};

const mockMovies: Movie[] = [
  {
    adult: false,
    backdrop_path: '/7ONMDhnErvpkKvkZqM82ud7bzcT.jpg',
    genre_ids: [ 28, 12, 53 ],
    id: 575265,
    original_language: 'en',
    original_title: 'Mission: Impossible - The Final Reckoning',
    overview: "Ethan Hunt and the IMF team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world's governments and a mysterious ghost from Ethan's past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.",
    popularity: 205.7232,
    poster_path: '/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg',
    release_date: new Date( '2025-05-17' ),
    title: 'Mission: Impossible - The Final Reckoning',
    video: false,
    vote_average: 7.393,
    vote_count: 89
  },
  {
    adult: false,
    backdrop_path: '/j0NUh5irX7q2jIRtbLo8TZyRn6y.jpg',
    genre_ids: [ 27, 9648 ],
    id: 574475,
    original_language: 'en',
    original_title: 'Final Destination Bloodlines',
    overview: 'Plagued by a violent recurring nightmare, college student Stefanie heads home to track down the one person who might be able to break the cycle and save her family from the grisly demise that inevitably awaits them all.',
    popularity: 503.2304,
    poster_path: '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
    release_date: new Date( '2025-05-09' ),
    title: 'Final Destination Bloodlines',
    video: false,
    vote_average: 7.113,
    vote_count: 257
  },
  {
    adult: false,
    backdrop_path: '/4A5HH9HkCPqAwyYL6CnA0mxbYjn.jpg',
    genre_ids: [ 28, 80, 53, 18 ],
    id: 1144430,
    original_language: 'fr',
    original_title: 'Balle perdue 3',
    overview: 'Car genius Lino returns to conclude his vendetta against Areski and the corrupt commander who ruined their lives in this turbo-charged trilogy finale.',
    popularity: 179.5989,
    poster_path: '/lCI5y1KkjgMoTkZiCleqji00XeE.jpg',
    release_date: new Date( '2025-05-06' ),
    title: 'Last Bullet',
    video: false,
    vote_average: 6.7,
    vote_count: 119
  },
  {
    adult: false,
    backdrop_path: '/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg',
    genre_ids: [ 28, 878, 12 ],
    id: 986056,
    original_language: 'en',
    original_title: 'Thunderbolts*',
    overview: 'After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.',
    popularity: 195.4565,
    poster_path: '/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg',
    release_date: new Date( '2025-04-30' ),
    title: 'Thunderbolts*',
    video: false,
    vote_average: 7.471,
    vote_count: 920
  },
  {
    adult: false,
    backdrop_path: '/bVm6udIB6iKsRqgMdQh6HywuEBj.jpg',
    genre_ids: [ 53, 28 ],
    id: 1233069,
    original_language: 'de',
    original_title: 'Exterritorial',
    overview: 'When her son vanishes inside a US consulate, ex-special forces soldier Sara does everything in her power to find him — and uncovers a dark conspiracy.',
    popularity: 176.2712,
    poster_path: '/jM2uqCZNKbiyStyzXOERpMqAbdx.jpg',
    release_date: new Date( '2025-04-29' ),
    title: 'Exterritorial',
    video: false,
    vote_average: 6.6,
    vote_count: 354
  }
];

const mockMovieResponse: MovieResponse = {
  page: 1,
  results: mockMovies,
  total_pages: 1,
  total_results: mockMovies.length
};

const mockGenres: Genre[] = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
];

const mockGenreMoviesResponse: GenreMoviesResponse = {
    genres: mockGenres
};

const mockDetailMovieResponse: DetailMovieResponse = {
  id: 123,
  title: 'Mock Movie Detail',
  overview: 'A detailed overview.',
  release_date: new Date( '2023-01-01' ),
  genres: [{ id: 28, name: 'Action' }],
  backdrop_path: '/backdrop.jpg',
  poster_path: '/poster.jpg',
  popularity: 123.45,
  vote_average: 8.5,
  vote_count: 1000,
  tagline: 'An amazing tagline.',
  status: 'Released',
  production_companies: [],
  production_countries: [],
  spoken_languages: [],
  belongs_to_collection: {} as any,
  budget: 1000000,
  homepage: 'http://example.com',
  imdb_id: 'tt1234567',
  original_language: 'en',
  original_title: 'Mock Movie Detail',
  revenue: 2000000,
  runtime: 120,
  origin_country: [ 'US' ],
  video: false,
  adult: false
};

describe('TmdbService', () => {
  let service: TmdbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const userGeolocationServiceMock = {
      getUserGeolocation: jest.fn().mockReturnValue({
        ...mockUserGeolocation,
        country_metadata: { languages: ['en_US'] },
        location: { country_code2: 'US' }
      })
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TmdbService,
        {
          provide: UserGeolocationService,
          useValue: userGeolocationServiceMock
        }
      ]
    });
    service = TestBed.inject(TmdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should be created.', () => {
    expect(service).toBeTruthy();
  });

  it('getMoviesFilteredByCategory should fetch movies for a given category and reset on page 1.', () => {
    const category = 'popular';
    service.getMoviesFilteredByCategory(category, 1).subscribe(response => {
      expect(response).toEqual([mockMovieResponse]);
    });
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=en_US&region=US&page=1`);
    req.flush(mockMovieResponse);
  });

  it('getGenreMovieListByIds should fetch and filter genres by ids.', () => {
    const genreIds = [28, 35];
    const expectedGenres = [{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }];
    service.getGenreMovieListByIds(genreIds).subscribe(genres => {
      expect(genres).toEqual(expectedGenres);
    });
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=en_US`);
    req.flush(mockGenreMoviesResponse);
  });

  it('getGenreMovieListByIds should return genres from cache on second call.', () => {
    service.getGenreMovieListByIds([28]).subscribe();
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=en_US`);
    req.flush(mockGenreMoviesResponse);
    service.getGenreMovieListByIds([28]).subscribe(genres => {
      expect(genres).toEqual([{ id: 28, name: 'Action' }]);
    });
    httpMock.expectNone(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=en_US`);
  });

  it('getGenreMovieList should fetch and sort the full genre list.', () => {
    const unsorted = { genres: [{ id: 35, name: 'Comedy' }, { id: 28, name: 'Action' }]};
    const sorted = [{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }];
    service.getGenreMovieList().subscribe(genres => { expect(genres).toEqual(sorted); });
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=en_US`);
    req.flush(unsorted);
  });

  it('getMovieById should fetch a movie by its ID.', () => {
    const movieId = 123;
    service.getMovieById(movieId).subscribe(movie => {
      expect(movie).toEqual(mockDetailMovieResponse);
    });
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}?api_key=${environment.tmdbApiKey}&language=en_US`);
    req.flush(mockDetailMovieResponse);
  });

  it('getMovieById should return movie from cache on second call.', () => {
    const movieId = 123;
    service.getMovieById(movieId).subscribe();
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}?api_key=${environment.tmdbApiKey}&language=en_US`);
    req.flush(mockDetailMovieResponse);
    service.getMovieById(movieId).subscribe(movie => {
      expect(movie).toEqual(mockDetailMovieResponse);
    });
    httpMock.expectNone(`${environment.tmdbApiUrl}/movie/${movieId}?api_key=${environment.tmdbApiKey}&language=en_US`);
  });

  it('getMoviesBasedIn should fetch related movies and reset on page 1.', () => {
    const basedIn = 'recommendations';
    const movieId = 123;
    service.getMoviesBasedIn(basedIn, movieId, 1).subscribe(response => {
      expect(response).toEqual([mockMovieResponse]);
    });
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=en_US&page=1`);
    req.flush(mockMovieResponse);
  });

  it('getMoviesFilteredByCategory should append movies when page !== 1.', () => {
    const category = 'popular';
    service.getMoviesFilteredByCategory(category, 1).subscribe(() => {
      service.getMoviesFilteredByCategory(category, 2).subscribe(response => {
        expect(response.length).toBe(2);
      });
      const req2 = httpMock.expectOne(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=en_US&region=US&page=2`);
      req2.flush(mockMovieResponse);
    });
    const req1 = httpMock.expectOne(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=en_US&region=US&page=1`);
    req1.flush(mockMovieResponse);
  });

  it('getMoviesFilteredByCategory should handle HTTP errors.', () => {
    const category = 'popular';
    service.getMoviesFilteredByCategory(category, 1).subscribe({
      next: () => {},
      error: (err) => { expect(err.status).toBe(500); }
    });
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/${category}?api_key=${environment.tmdbApiKey}&language=en_US&region=US&page=1`);
    req.flush(null, { status: 500, statusText: 'Server Error.' });
  });

  it('getGenreMovieList should return genres from cache on second call.', () => {
    service.getGenreMovieList().subscribe();
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=en_US`);
    req.flush(mockGenreMoviesResponse);
    service.getGenreMovieList().subscribe(genres => { expect(genres).toEqual(mockGenres); });
    httpMock.expectNone(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=en_US`);
  });

  it('getMoviesBasedIn should append movies when page !== 1.', () => {
    const basedIn = 'recommendations';
    const movieId = 123;
    service.getMoviesBasedIn(basedIn, movieId, 1).subscribe(() => {
      service.getMoviesBasedIn(basedIn, movieId, 2).subscribe(response => {
        expect(response.length).toBe(2);
      });
      const req2 = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=en_US&page=2`);
      req2.flush(mockMovieResponse);
    });
    const req1 = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=en_US&page=1`);
    req1.flush(mockMovieResponse);
  });

  it('getMoviesBasedIn should handle HTTP errors.', () => {
    const basedIn = 'recommendations';
    const movieId = 123;
    service.getMoviesBasedIn(basedIn, movieId, 1).subscribe({
      next: () => {},
      error: (err) => { expect(err.status).toBe(500); }
    });
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/${movieId}/${basedIn}?api_key=${environment.tmdbApiKey}&language=en_US&page=1`);
    req.flush(null, { status: 500, statusText: 'Server Error.' });
  });

  it('getGenreMovieList should handle empty genre list.', () => {
    service.getGenreMovieList().subscribe(genres => { expect(genres).toEqual([]); });
    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=en_US`);
    req.flush({ genres: [] });
  });
});
