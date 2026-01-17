import { of } from 'rxjs';
import { mockPaginatedMovies } from './mock-tmdb-service';
import { Cast, Department, Keyword, MovieCollection, MovieCredit, ProductionCompany, ProductionCountry, SpokenLanguage, Trailer } from '../interfaces';

export const mockKeywords: Keyword[] = [
  { id: 1, name: 'keyword 1' }, { id: 2, name: 'keyword 2' }, { id: 3, name: 'keyword 3' }, { id: 4, name: 'keyword 4' }
];

export const mockSpokenLanguages: SpokenLanguage[] = [
  { english_name: 'Spanish', iso_639_1: 'es', name: 'Spanish' }, { english_name: 'English', iso_639_1: 'en', name: 'English' },
  { english_name: 'French', iso_639_1: 'fr', name: 'French' }, { english_name: 'German', iso_639_1: 'de', name: 'German' }
];

export const mockProductionCompanies: ProductionCompany[] = [
  { id: 1, logo_path: null, name: 'Company 1', origin_country: 'US' }, { id: 2, logo_path: null, name: 'Company 2', origin_country: 'US' },
  { id: 3, logo_path: null, name: 'Company 3', origin_country: 'US' }, { id: 4, logo_path: null, name: 'Company 4', origin_country: 'US' }
];

export const mockProductionCountries: ProductionCountry[] = [
  { iso_3166_1: 'CO', name: 'Colombia' }, { iso_3166_1: 'MX', name: 'Mexico' },
  { iso_3166_1: 'CA', name: 'Canada' }, { iso_3166_1: 'AR', name: 'Argentina' }
];

export const mockTrailers: Trailer[] = [
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

export const mockCasts: Cast[] = Array.from({ length: 10 }, (_, i) => ({
  adult: false,
  gender: 2,
  id: i + 1,
  known_for_department: Department.Acting,
  name: `Jhon Doe ${i + 1}`,
  original_name: `Jhon Doe ${i + 1}`,
  popularity: 8,
  profile_path: '/images/no-profile.jpg',
  cast_id: 1234,
  character: `Character Jhon Doe ${i + 1}`,
  credit_id: '1234',
  order: 1,
  department: Department.Acting,
  job: 'Acting'
}));

export const mockMovieCredit: MovieCredit = {
  id: 123,
  cast: mockCasts,
  crew: []
}

export const mockMovieCollection: MovieCollection = {
  id: 1,
  name: 'Collection',
  overview: 'Some overview',
  poster_path: '/images/no-poster.jpg',
  backdrop_path: '/images/no-backdrop.jpg',
  parts: [
    {
      backdrop_path: '/images/no-backdrop.jpg',
      id: 10,
      title: 'Part 1',
      original_title: 'Part 1 Original',
      overview: 'Overview part 1',
      poster_path: '/images/no-poster.jpg',
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

export class MockDetailService {
  getMovieKeywords = jest.fn().mockReturnValue(of(mockKeywords));
  getMovieTrailers = jest.fn().mockReturnValue(of(mockTrailers));
  getMovieCredits = jest.fn().mockReturnValue(of(mockMovieCredit));
  getRelatedMovies = jest.fn().mockReturnValue(of(mockPaginatedMovies[0]));
  getMovieCollectionById = jest.fn().mockReturnValue(of(mockMovieCollection));
}
