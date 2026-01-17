import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'info-item',
  imports: [ CurrencyPipe ],
  template: `
    @if(label() && value()) {
      <section class="flex flex-wrap items-center gap-3">
        <span class="text-xs lg:text-sm text-yellow-600 font-semibold">{{ label() }}</span>
        <span class="text-xs lg:text-sm text-stone-300">{{ isCurrency()? (value() | currency:'US'): value() }}</span>
      </section>
      <hr class="text-stone-700 mt-5">
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-4' }
})
export class InfoItem {
  label = input.required<string>();
  value = input.required<string | number>();
  isCurrency = computed(() => typeof(this.value()) === 'number');
}
