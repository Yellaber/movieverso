import { Genre } from './genre-movies-response.interface';

type typeSort = 'popularity.desc' | 'primary_release_date.asc' | 'primary_release_date.desc' |
'title.asc' | 'vote_average.desc' | 'vote_count.desc';

export interface QueryParams {
  primaryReleaseDateGte?: string,
  primaryReleaseDateLte?: string,
  primaryReleaseYear?: number,
  releaseDateGte?: string,
  voteAverageGte?: number,
  voteCountGte?: number
  sortBy?: typeSort,
  withGenres?: Genre[],
  withKeywords?: string,
  withCompanies?: string,
  withOriginCountry?: string,
  withOriginalLanguage?: string,
};
