import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'production-countries-skeleton',
  imports: [],
  template: `
    <div class="w-32 h-6 bg-stone-700 rounded"></div>
    <div class="flex items-center gap-3">
      <div class="w-10 h-8 bg-stone-700 rounded"></div>
      <div class="w-24 h-6 bg-stone-600 rounded"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3' }
})
export class ProductionCountriesSkeleton { }
