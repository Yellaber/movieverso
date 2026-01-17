import { of } from 'rxjs';
import { BelongsToCollection, DetailMovie, GenreMovies, Movie, PaginatedMovies } from '@interfaces';

export const mockGenreMovies: GenreMovies = {
  genres: [
    { id: 1, name: 'Genre 1' }, { id: 2, name: 'Genre 2' },
    { id: 3, name: 'Genre 3' }, { id: 4, name: 'Genre 4' }
  ]
};

export const mockMovies: Movie[] = Array.from({ length: 30 }, (_, i) => ({
  adult: false,
  backdrop_path: `/images/no-backdrop.jpg`,
  genre_ids: [1, 2],
  id: i + 1,
  original_language: 'es',
  original_title: `Pelicula ${i + 1}`,
  overview: `Resumen ${i + 1}`,
  popularity: 10,
  poster_path: `/images/no-poster.jpg`,
  release_date: new Date('2024-01-01'),
  title: `Pelicula ${i + 1}`,
  video: false,
  vote_average: 8.5,
  vote_count: 100
}));

export const mockPaginatedMovies: PaginatedMovies[] = [
  {
    page: 1,
    results: mockMovies.splice(0, 20),
    total_pages: 2,
    total_results: mockMovies.length
 },
 {
    page: 2,
    results: mockMovies.splice(20, 30),
    total_pages: 2,
    total_results: mockMovies.length
 }
];

export const mockBelongsToCollection: BelongsToCollection = {
  id: 125,
  name: 'Collection',
  poster_path: '/images/no-poster.jpg',
  backdrop_path: '/images/no-backdrop.jpg'
};

export const mockDetailMovie : DetailMovie = {
  id: 123,
  title: 'Mock Movie Detail',
  overview: 'A detailed overview.',
  release_date: new Date( '2025-01-01' ),
  genres: [{ id: 1, name: 'Genre 1' }],
  backdrop_path: '/images/no-backdrop.jpg',
  poster_path: '/images/no-poster.jpg',
  popularity: 123.45,
  vote_average: 8.5,
  vote_count: 1000,
  tagline: 'An amazing tagline.',
  status: 'Released',
  production_companies: [],
  production_countries: [],
  spoken_languages: [],
  belongs_to_collection: mockBelongsToCollection,
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
  getGenresMovie = jest.fn().mockReturnValue(of(mockGenreMovies.genres));
  getPaginatedMovies = jest.fn().mockReturnValue(of(mockMovies));
  getDetailMovieById = jest.fn().mockReturnValue(of(mockDetailMovie));
  getPaginatedMoviesByCategory = jest.fn().mockImplementation((endPoint: string, page: number) => (endPoint && page)? of(mockPaginatedMovies): of([]));
  getGenresMovieByIds = jest.fn().mockImplementation((ids: number[]) => of(mockGenreMovies.genres.filter(genre => ids.includes(genre.id))));
  getPaginatedMoviesBasedIn = jest.fn().mockImplementation((type: string, movieId: number, page: number) =>
    (type && movieId && page)? of(mockPaginatedMovies): of([])
  );
}
