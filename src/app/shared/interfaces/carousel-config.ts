import { Movie } from './paginated-movies';

export interface CarouselConfig {
  carouselTitle?: string,
  text?: string;
  movies: Movie[],
  route?: string,
  bgButtons?: string,
  bgCardFooter?: string
};
