
export type TypeSort = 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc' |
'vote_count.desc' | 'vote_count.asc' | 'vote_count.desc' | 'primary_release_date.desc' |
'primary_release_date.asc' | 'title.asc' | 'title.desc';

export interface QueryParams {
  primaryReleaseDateGte?: string,
  primaryReleaseDateLte?: string,
  releaseDateGte?: string,
  voteAverageGte?: number,
  voteCountGte?: number,
  sortBy?: TypeSort,
  withGenres?: string,
  query?: string
};
