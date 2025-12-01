
export type TypeTag = 'now-playing' | 'popular' | 'top-rated' | 'trending' | 'calendar';

export interface DataSectionMovie {
  heroType: TypeTag,
  heroTitle: string,
  carouselTitle: string
};
