import { Movie, MovieResponse } from '@shared/interfaces';

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
