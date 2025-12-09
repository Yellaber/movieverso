import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CarouselService } from '@services';
import { Control } from "./control/control";

@Component({
  selector: 'carousel',
  imports: [ Control, FontAwesomeModule ],
  templateUrl: './carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel {
  private carouselService = inject(CarouselService);
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  carouselCredit = viewChild<ElementRef<HTMLDivElement>>('carousel');
  totalCards = input.required<number>();
  widthCardContainer = input.required<number>();
  bgControl = input.required<string>();
  private getWidthCarouselCreditContainer = computed(() => this.carouselCredit()?.nativeElement.offsetWidth);

  constructor() {
    effect(() => {
      const offsetWidthCarouselCreditContainer = this.getWidthCarouselCreditContainer();
      if(offsetWidthCarouselCreditContainer && this.widthCardContainer()) {
        this.carouselService.initializer(offsetWidthCarouselCreditContainer, this.widthCardContainer(), this.totalCards());
      }
    });
  };

  getScrollStep(): number {
    return this.carouselService.getScrollStep();
  };

  isPrevious(): boolean {
    return this.carouselService.isPrevious();
  };

  isNext(): boolean {
    return this.carouselService.isNext();
  };

  previous() {
    this.carouselService.previous();
  };

  next() {
    this.carouselService.next();
  };
}
