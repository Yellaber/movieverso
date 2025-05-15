import { Movie } from './movie-response.interface';

type typeTag = 'upcoming' | 'now_playing' | 'popularity' | 'rated' | 'trending';

export interface SectionMovie {
  heroType: typeTag,
  heroTitle: string,
  carruselTitle: string,
  route: string
}
