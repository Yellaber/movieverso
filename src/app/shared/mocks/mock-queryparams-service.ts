import { QueryParams } from '@interfaces';
import { initialQueryParams } from '@services';

export const mockQueryParams: QueryParams = {
  primaryReleaseDateGte: '2025-01-01',
  primaryReleaseDateLte: '2025-02-01',
  query: 'Inception',
  sortBy: 'vote_average.desc',
  voteAverageGte: 8,
  voteCountGte: 200,
  withGenres: '1'
};

export class MockQueryParamsService {
  getQueryParams = jest.fn().mockReturnValue(mockQueryParams);
  set = jest.fn();
};

export class MockDefaultQueryParamsService {
  getQueryParams = jest.fn().mockReturnValue(initialQueryParams);
  set = jest.fn();
};
