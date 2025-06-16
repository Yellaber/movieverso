import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'info-item-skeleton',
  imports: [],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <div class="w-32 h-6 bg-stone-700 rounded"></div>
      <div class="w-20 h-6 bg-stone-600 rounded"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoItemSkeletonComponent { }
