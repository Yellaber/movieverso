import { computed, Injectable, signal } from '@angular/core';

const CARD_MOVIE_SIZE = 176; //160px(card size movie) + gap-4(16px)

@Injectable({
  providedIn: 'root'
})
export class CarouselMoviesService {
  private totalMovies = signal<number>(0);
  private carouselContainerWidth = signal<number>(0);
  private scrollStep = signal<number>(0);
  private visibleMovies = computed<number>(() => this.carouselContainerWidth() / CARD_MOVIE_SIZE);
  private scrollVisibleMovies = computed<number>(() => Math.floor(this.visibleMovies()) * CARD_MOVIE_SIZE);
  private totalScrollStep = computed<number>(() => this.totalMovies() * CARD_MOVIE_SIZE - this.scrollVisibleMovies());
  private getPartNotVisible = computed<number>(() =>
    (this.visibleMovies() - Math.floor(this.visibleMovies())) * CARD_MOVIE_SIZE + 16
  );
  isPrevious = computed<boolean>(() => this.scrollStep() > 0);
  isNext = computed<boolean>(() => this.scrollStep() < this.totalScrollStep() - this.getPartNotVisible());

  initializer(carouselContainerWith: number, totalMovies: number) {
    this.carouselContainerWidth.set(carouselContainerWith);
    this.totalMovies.set(totalMovies);
  };

  next() {
    (this.scrollStep() + this.scrollVisibleMovies() < this.totalScrollStep())?
    this.scrollStep.update(value => value + this.scrollVisibleMovies()):
    this.scrollStep.set(this.totalScrollStep() - this.getPartNotVisible());
  };

  previous() {
    (this.scrollStep() - this.scrollVisibleMovies() > 0)?
    this.scrollStep.update(value => value - this.scrollVisibleMovies()): this.scrollStep.set(0);
  };

  getScrollStep() {
    return this.scrollStep();
  };
};
