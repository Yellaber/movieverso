import { Movie } from './movie-response.interface';

export interface CarouselConfig {
  carouselTitle: string,
  movies: Movie[],
  route: string,
  bgButtons: string,
  bgCardFooter: string
};
