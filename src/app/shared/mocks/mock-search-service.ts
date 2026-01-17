import { of } from 'rxjs';
import { mockPaginatedMovies } from './mock-tmdb-service';
import { QueryParams } from '../interfaces';

export class MockSearchService {
  getMovieByTitle = jest.fn().mockImplementation((query: string, page: number) => (query && page >= 1)? of(mockPaginatedMovies): of([]));
  getMoviesFiltered = jest.fn().mockImplementation((queryParams: QueryParams, page: number) => (queryParams && page >= 1)? of(mockPaginatedMovies): of([]));
}
