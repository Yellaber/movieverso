import { of } from 'rxjs';
import { mockMovies } from './mock-tmdb-service';

export class MockHomeService {
  getMovies = jest.fn().mockImplementation((endPoint: string) => endPoint? of(mockMovies): of([]));
}
