import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'secondary-header',
  imports: [],
  template: `
    <h2 class="text-sm lg:text-xl font-bold text-yellow-600">{{ header() }}</h2>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryHeaderComponent {
  header = input.required<string>();
}
