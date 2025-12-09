import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'carousel-credit-skeleton',
  imports: [],
  template: `
    <section class="relative overflow-hidden">
      <div class="flex gap-4">
        @for(_ of cardsSkeleton; track $index) {
          <div class='flex shrink-0 md:w-56 lg:w-64 items-center rounded-md bg-stone-700 gap-4 pr-3'>
            <div class='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-stone-600 rounded-l-md'></div>
            <div class="flex flex-col justify-center w-full gap-3">
              <div class="w-28 h-4 lg:h-6 bg-stone-600 rounded"></div>
              <div class="w-32 h-4 lg:h-6 bg-stone-600 rounded"></div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselCreditSkeleton {
  cardsSkeleton = Array(10);
}
