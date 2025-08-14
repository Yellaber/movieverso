import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { UserGeolocationService } from '@app/core/services';
import { Movie, MovieResponse, QueryParams, UserGeolocation } from '@shared/interfaces';
import { environment } from '@app/environments/environment.developments';

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

    it('Should return empty array when page <= 0', () => {
      const query = 'title';
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMovieByTitle(query, 0).subscribe(response => { moviesResponse = response; });
      expect(moviesResponse).toEqual([]);
    });
  });

  describe('getMoviesFiltered().', () => {
    it('Should fetch movies filtered and reset on page 1.', () => {
      const queryParams: QueryParams = { sortBy: 'popularity.desc', voteAverageGte: 8, voteCountGte: 1000 };
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMoviesFiltered(queryParams, 1).subscribe(response => { moviesResponse = response; });
      const req = httpClientMock.expectOne(request => request.url === `${environment.tmdbApiUrl}/discover/movie`);
      const { params } = req.request;
      expect(params.get('sort_by')).toBe('popularity.desc');
      expect(params.get('vote_average.gte')).toBe('8');
      expect(params.get('vote_count.gte')).toBe('1000');
      req.flush(mockMovieResponse);
      expect(moviesResponse).toEqual([mockMovieResponse]);
    });

    it('Should append movies when page > 1.', () => {
      const queryParams: QueryParams = { sortBy: 'popularity.desc', voteAverageGte: 8, voteCountGte: 1000 };
      searchService.getMoviesFiltered(queryParams, 1).subscribe();
      const req1 = httpClientMock.expectOne(request => request.url === `${environment.tmdbApiUrl}/discover/movie`);
      expect(req1.request.params.get('sort_by')).toBe('popularity.desc');
      expect(req1.request.params.get('vote_average.gte')).toBe('8');
      expect(req1.request.params.get('vote_count.gte')).toBe('1000');
      req1.flush(mockMovieResponse);
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMoviesFiltered(queryParams, 2).subscribe(response => { moviesResponse = response; });
      const req2 = httpClientMock.expectOne(request => request.url === `${environment.tmdbApiUrl}/discover/movie`);
      expect(req2.request.params.get('sort_by')).toBe('popularity.desc');
      expect(req2.request.params.get('vote_average.gte')).toBe('8');
      expect(req2.request.params.get('vote_count.gte')).toBe('1000');
      req2.flush(mockMovieResponse);
      expect(moviesResponse?.length).toBe(2);
    });

    it('Should return empty array when page <= 0', () => {
      const queryParams: QueryParams = { sortBy: 'popularity.desc', voteAverageGte: 8, voteCountGte: 1000 };
      let moviesResponse: MovieResponse[] | undefined;
      searchService.getMoviesFiltered(queryParams, 0).subscribe(response => { moviesResponse = response; });
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
