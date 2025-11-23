import { CategoryTranslations, EndPointValid } from '@shared/interfaces';

export class CategoryUtils {
  static getCategoryTranslations(category: string): CategoryTranslations {
    switch(category) {
      case 'now-playing':
        return {
          endPoint: EndPointValid.nowPlaying,
          title: 'routes.nowPlaying',
          paragraph: 'nowPlaying.paragraph'
        };
      case 'popular':
        return {
          endPoint: EndPointValid.popular,
          title: 'routes.popular',
          paragraph: 'popular.paragraph'
        };
      case 'top-rated':
        return {
          endPoint: EndPointValid.topRated,
          title: 'routes.topRated',
          paragraph: 'topRated.paragraph'
        };
      case 'trending':
        return {
          endPoint: EndPointValid.trending,
          title: 'routes.trending',
          paragraph: 'trending.paragraph'
        };
      default:
        return {
          endPoint: EndPointValid.upcoming,
          title: 'routes.upcoming',
          paragraph: 'upcoming.paragraph'
        };
    }
  };
};
