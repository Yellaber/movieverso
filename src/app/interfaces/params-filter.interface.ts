
type typeSort = 'title.asc' | 'popularity.desc' | 'vote_average.desc' | 'primary_release_date.asc';

export interface ParamsFilter {
  'api_key': string,
  'language': string,
  'region': string,
  'page': number,
  'with_genres'?: string[],
  'with_original_language'?: string,
  'primary_release_year'?: number,
  'vote_average.gte'?: number,
  'with_origin_country'?: string,
  'primary_release_date.gte'?: string,
  'with_companies'?: string,
  'release_date.gte'?: string,
  'sort_by'?: typeSort,
  'vote_count.gte'?: number
};
