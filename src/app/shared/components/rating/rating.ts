import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire, faStar, faThumbsUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

type TypeRating = 'popularity' | 'vote_average' | 'vote_count';

interface Icon {
  type: TypeRating,
  faIcon: IconDefinition
}

const icons: Icon[] = [
  { type: 'popularity', faIcon: faFire }, { type: 'vote_average', faIcon: faStar },
  { type: 'vote_count', faIcon: faThumbsUp }
];

@Component({
  selector: 'rating',
  imports: [ DecimalPipe, FontAwesomeModule ],
  template: `
    @if(getIcon() && value() >= 0) {
      <a class="flex items-center gap-1">
        <fa-icon class="text-yellow-600" [icon]="getIcon()!.faIcon"></fa-icon>
        @switch(type()) {
          @case('popularity') {
            <small class="text-stone-300">{{ value() | number: '1.1-1' }}</small>
          }
          @case('vote_average') {
            <small class="text-stone-300">{{ value() | number: '1.1-1' }}/10</small>
          }
          @default {
            <small class="text-stone-300">{{ value() | number: '1.0-0' }}</small>
          }
        }
      </a>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Rating {
  type = input.required<TypeRating>();
  value = input.required<number>();
  getIcon = computed(() => icons.find(icon => icon.type === this.type()));
}
