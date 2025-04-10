import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'carrusel-title',
  imports: [],
  template: `
    <div class="flex mb-5">
      <div class="rounded-full bg-stone-800 yellow-color px-4 py-2">
        <h2 class="text-xl md:text-2xl lg:text-3xl yellow-color font-semibold">{{ carruselTitle() }}</h2>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarruselTitleComponent {
  carruselTitle = input.required<string>();
}
