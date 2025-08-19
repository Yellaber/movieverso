import { Movie } from './movie-response.interface';

export interface CarouselConfig {
  carouselTitle?: string,
  text?: string;
  movies: Movie[],
  route?: string,
  bgButtons?: string,
  bgCardFooter?: string
};
