import { Genre } from './genre-movies-response.interface';

type typeSort = 'title.asc' | 'popularity.desc' | 'vote_average.desc' | 'primary_release_date.asc' | 'primary_release_date.desc';

export interface QueryParams {
  withGenres?: Genre[],
  withOriginalLanguage?: string,
  primaryReleaseYear?: number,
  voteAverageGte?: number,
  withOriginCountry?: string,
  primaryReleaseDateGte?: string,
  primaryReleaseDateLte?: string,
  withCompanies?: string,
  releaseDateGte?: string,
  sortBy?: typeSort,
  voteCountGte?: number
};
