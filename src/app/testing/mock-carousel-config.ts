import { CarouselConfig } from '@shared/interfaces';
import { mockMovies } from './mock-movie-response';

export const MockCarouselConfig: CarouselConfig = {
  carouselTitle: 'Carousel Title',
  text: 'Carousel Text',
  movies: mockMovies,
  route: '/route',
  bgButtons: 'bg-stone-800',
  bgCardFooter: 'bg-stone-900'
};
