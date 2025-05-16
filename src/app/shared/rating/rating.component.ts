import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire, faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface Rating {
  type: string,
  faIcon: IconDefinition
}

const ratings: Rating[] = [
  {
    type: 'popularity',
    faIcon: faFire
  },
  {
    type: 'vote',
    faIcon: faStar
  }
];

@Component({
  selector: 'rating',
  imports: [
    DecimalPipe,
    FontAwesomeModule
  ],
  template: `
    <a class="flex items-center gap-2" href="#">
      <fa-icon class="text-yellow-600" [icon]="getRating()!.faIcon"></fa-icon>
      @if(type() === 'popularity') {
        <small class="text-stone-300">{{ value() | number: '1.1-1' }}</small>
      } @else {
        <small class="text-stone-300">{{ value() | number: '1.1-1' }}/10</small>
      }
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {
  type = input.required<string>();
  value = input.required<number>();

  getRating(): Rating | undefined {
    return ratings.find(rating => (rating.type === this.type()) && rating);
  }
}
