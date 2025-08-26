export type TypeSort = 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc' |
'vote_count.desc' | 'vote_count.asc' | 'primary_release_date.desc' |
'primary_release_date.asc' | 'title.asc' | 'title.desc';

export interface QueryParams {
  primaryReleaseDateGte: string,
  primaryReleaseDateLte: string,
  query: string
  sortBy: TypeSort,
  voteAverageGte: number,
  voteCountGte: number,
  withGenres: string,
};
