import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'carrusel-title-skeleton',
  imports: [],
  template: `
    <div class="rounded-full bg-stone-800 px-4 py-2">
      <div class="w-40 h-6 bg-stone-700 rounded"></div>
    </div>
    <div class="w-30 h-6 bg-stone-700 rounded"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex justify-between mb-5' }
})
export class CarruselTitleSkeletonComponent { }
