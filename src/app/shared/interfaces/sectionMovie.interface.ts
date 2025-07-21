
export type TypeTag = 'now-playing' | 'popular' | 'top-rated' | 'trending' | 'calendar';

export interface SectionMovie {
  heroType: TypeTag,
  heroTitle: string,
  carruselTitle: string
}
