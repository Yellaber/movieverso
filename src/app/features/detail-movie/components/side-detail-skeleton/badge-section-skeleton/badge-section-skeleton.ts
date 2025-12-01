import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'badge-section-skeleton',
  imports: [],
  template: `
    <div class="w-32 h-6 bg-stone-700 rounded"></div>
    <div class="flex flex-wrap gap-2">
      @for(item of [1, 2]; track $index) {
        <div class="h-6 w-20 bg-stone-600 rounded-full"></div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-4' }
})
export class BadgeSectionSkeleton { }
