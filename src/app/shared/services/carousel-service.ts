import { computed, Injectable, signal } from '@angular/core';

const GAP = 16;

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  private totalCards = signal<number>(0);
  private carouselContainerWidth = signal<number>(0);
  private cardContainerWidth = signal<number>(0);
  private scrollStep = signal<number>(0);
  private visibleCards = computed<number>(() => this.carouselContainerWidth() / this.cardContainerWidth());
  private scrollVisibleCards = computed<number>(() => Math.floor(this.visibleCards()) * this.cardContainerWidth());
  private totalScrollStep = computed<number>(() => this.totalCards() * this.cardContainerWidth() - this.scrollVisibleCards());
  private getPartNotVisible = computed<number>(() => (this.visibleCards() - Math.floor(this.visibleCards())) * this.cardContainerWidth());
  private getMax = computed<number>(() => this.totalScrollStep() - this.getPartNotVisible());
  getScrollStep = computed(() => this.scrollStep());
  hasPrevious = computed<boolean>(() => this.scrollStep() > 0);
  hasNext = computed<boolean>(() => this.scrollStep() < this.getMax() - GAP);

  initializer(carouselContainerWidth: number, cardContainerWidth: number, totalCards: number) {
    this.carouselContainerWidth.set(carouselContainerWidth);
    this.cardContainerWidth.set(cardContainerWidth + GAP);
    this.totalCards.set(totalCards);
  }

  next() {
    const step = this.scrollVisibleCards();
    const max = this.getMax();
    this.scrollStep.update(current => current + step < max? current + step: max - GAP);
  }

  previous() {
    const step = this.scrollVisibleCards();
    this.scrollStep.update(current => current - step > 0? current - step: 0);
  }
}
