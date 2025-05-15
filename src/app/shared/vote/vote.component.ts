import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vote',
  imports: [
    DecimalPipe,
    FontAwesomeModule
  ],
  template: `
    <div class="flex items-center gap-2">
      <fa-icon class="text-yellow-600" [icon]="faStar"></fa-icon>
      <small class="text-stone-300">{{ vote() | number: '1.1-1' }}/10</small>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent {
  faStar = faStar;
  vote = input.required<number>();
}
