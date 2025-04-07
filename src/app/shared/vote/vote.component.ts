import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
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
      <fa-icon  class="yellow-color" [icon]="faStar"></fa-icon>
      <small>{{ vote() | number: '1.1-1' }}/10</small>
    </div>
  `
})
export class VoteComponent {
  faStar = faStar;
  vote = input.required<number>();
}
