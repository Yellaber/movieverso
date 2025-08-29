import { of } from 'rxjs';
import { DetailMovieResponse, GenreMoviesResponse, Keyword, Movie, MovieCollectionResponse, MovieResponse, Trailer } from '@shared/interfaces';

export const mockKeywords: Keyword[] = [
  { id: 1, name: 'keyword 1' }, { id: 2, name: 'keyword 2' },
  { id: 3, name: 'keyword 3' }, { id: 4, name: 'keyword 4' }
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

export const mockCollection: MovieCollectionResponse = {
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

export const mockGenreMoviesResponse: GenreMoviesResponse = {
  genres: [
    { id: 1, name: 'Genre 1' }, { id: 2, name: 'Genre 2' },
    { id: 3, name: 'Genre 3' }, { id: 4, name: 'Genre 4' }
  ]
};

export const mockMovies: Movie[] = Array.from({ length: 20 }, (_, i) => ({
  adult: false,
  backdrop_path: `/backdrop-${i + 1}.jpg`,
  genre_ids: [1, 2],
  id: i + 1,
  original_language: 'es',
  original_title: `Pelicula ${i + 1}`,
  overview: `Resumen ${i + 1}`,
  popularity: 10,
  poster_path: `/poster-${i + 1}.jpg`,
  release_date: new Date('2024-01-01'),
  title: `Pelicula ${i + 1}`,
  video: false,
  vote_average: 8.5,
  vote_count: 100
}));

export const mockMovieResponse: MovieResponse = {
  page: 1,
  results: mockMovies,
  total_pages: 1,
  total_results: mockMovies.length
};

export const mockDetailMovieResponse: DetailMovieResponse = {
  id: 123,
  title: 'Mock Movie Detail',
  overview: 'A detailed overview.',
  release_date: new Date( '2025-01-01' ),
  genres: [{ id: 1, name: 'Genre 1' }],
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

export class MockTmdbService {
  getGenreMovieList = jest.fn().mockReturnValue(of(mockGenreMoviesResponse.genres));
  getMovies = jest.fn().mockReturnValue(of(mockMovies));
  getMovieById = jest.fn().mockReturnValue(of(mockDetailMovieResponse));
  getMoviesFilteredByCategory = jest.fn().mockReturnValue(of([ mockMovieResponse ]));
  getGenreMovieListByIds = jest.fn().mockImplementation((ids: number[]) => of(mockGenreMoviesResponse.genres.filter(genre => ids.includes(genre.id))));
  getMoviesBasedIn = jest.fn().mockReturnValue(of([ mockMovieResponse ]));
};
