import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'carousel-title',
  imports: [],
  template: `
    @if(isValidTitle()) {
      <div class="rounded-full bg-yellow-900/50 px-4 py-2">
        <h2 class="text-xl lg:text-2xl">{{ carouselTitle() }}</h2>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center text-yellow-600 font-semibold mb-5' }
})
export class CarouselTitle {
  carouselTitle = input.required<string>();
  isValidTitle = computed<boolean>(() => !!this.carouselTitle() && this.carouselTitle().trim() !== '');
}
