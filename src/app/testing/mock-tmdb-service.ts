import { of } from 'rxjs';
import { DetailMovieResponse, GenreMoviesResponse, Movie, MovieResponse } from '@shared/interfaces';

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
