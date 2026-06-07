import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, OnDestroy, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Control } from './control/control';
import { CarouselCacheService, CarouselService } from '@services';

@Component({
  selector: 'carousel',
  imports: [ Control, FontAwesomeModule ],
  providers: [ CarouselService ],
  templateUrl: './carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel implements OnDestroy {
  private carouselService = inject(CarouselService);
  private carouselCacheService = inject(CarouselCacheService);
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  carouselContainer = viewChild<ElementRef<HTMLDivElement>>('carousel');
  totalCards = input.required<number>();
  widthCardContainer = input.required<number>();
  bgControl = input.required<string>();
  cacheKey = input<string | undefined>(undefined);
  getWidthCarouselContainer = computed(() => this.carouselContainer()?.nativeElement.offsetWidth);
  getScrollStep = computed(() => this.carouselService.getScrollStep());
  hasPrevious = computed(() => this.carouselService.hasPrevious());
  hasNext = computed(() => this.carouselService.hasNext());

  constructor() {
    effect(() => {
      const offsetWidthCarouselContainer = this.getWidthCarouselContainer();
      if(offsetWidthCarouselContainer && this.widthCardContainer()) {
        this.carouselService.initializer(offsetWidthCarouselContainer, this.widthCardContainer(), this.totalCards());
        const key = this.cacheKey();
        if(key) {
          const cached = this.carouselCacheService.getPosition(key);
          if(cached !== undefined) {
            this.carouselService.setScrollStep(cached);
          }
        }
      }
    });
  }

  ngOnDestroy() {
    const key = this.cacheKey();
    if(key) {
      this.carouselCacheService.savePosition(key, this.carouselService.getScrollStep());
    }
  }
}
