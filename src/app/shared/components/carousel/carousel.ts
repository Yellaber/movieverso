import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Control } from './control/control';
import { CarouselService } from '@services';

@Component({
  selector: 'carousel',
  imports: [ Control, FontAwesomeModule ],
  providers: [ CarouselService ],
  templateUrl: './carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel {
  private carouselService = inject(CarouselService);
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  carouselContainer = viewChild<ElementRef<HTMLDivElement>>('carousel');
  totalCards = input.required<number>();
  widthCardContainer = input.required<number>();
  bgControl = input.required<string>();
  getWidthCarouselContainer = computed(() => this.carouselContainer()?.nativeElement.offsetWidth);
  getScrollStep = computed(() => this.carouselService.getScrollStep());
  hasPrevious = computed(() => this.carouselService.hasPrevious());
  hasNext = computed(() => this.carouselService.hasNext());

  constructor() {
    effect(() => {
      const offsetWidthCarouselContainer = this.getWidthCarouselContainer();
      if(offsetWidthCarouselContainer && this.widthCardContainer()) {
        this.carouselService.initializer(offsetWidthCarouselContainer, this.widthCardContainer(), this.totalCards());
      }
    });
  }
}
