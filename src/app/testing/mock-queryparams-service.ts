import { QueryParams } from '@shared/interfaces';

export const mockQueryParams: QueryParams = {
  primaryReleaseDateGte: '2025-01-01',
  primaryReleaseDateLte: '2025-02-01',
  voteAverageGte: 8,
  voteCountGte: 200,
  sortBy: 'vote_average.desc',
  withGenres: '1'
};

export class MockQueryParamsService {
  getQueryParams = jest.fn().mockReturnValue(mockQueryParams);
  set = jest.fn();
};

export class MockQueryParamsServiceEmpty {
  getQueryParams = jest.fn().mockReturnValue(undefined);
  set = jest.fn();
};
