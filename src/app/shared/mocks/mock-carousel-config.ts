import { CarouselConfig } from '@interfaces';
import { mockMovies } from './mock-tmdb-service';

export const MockCarouselConfig: CarouselConfig = {
  carouselTitle: 'Carousel Title',
  text: 'Carousel Text',
  movies: mockMovies,
  route: '/route',
  bgButtons: 'bg-stone-800'
};
