import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'info-item',
  imports: [ CurrencyPipe ],
  template: `
    @if(value()) {
      <span class="text-xs lg:text-sm text-yellow-600 font-semibold">{{ label() }}</span>
      <span class="text-xs lg:text-sm
      text-stone-300">{{ isCurrency()? (value() | currency:'US'): value() }}</span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-wrap items-center gap-3' }
})
export class InfoItemComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  isCurrency = input(false);
}
