import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'paragraph',
  imports: [],
  template: `
    <p class="leading-relaxed pb-7 lg:pb-10">{{ text() }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParagraphComponent {
  text = input.required<string>();
};
