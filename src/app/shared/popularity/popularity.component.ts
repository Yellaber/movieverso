import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'popularity',
  imports: [
    DecimalPipe,
    FontAwesomeModule
  ],
  template: `
    <div class="flex items-center gap-2">
      <fa-icon class="yellow-color" [icon]="faFire"></fa-icon>
      <small>{{ popularity() | number: '1.1-1' }}</small>
    </div>
  `,
})
export class PopularityComponent {
  faFire = faFire;
  popularity = input.required<number>();
}
