import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CarouselService } from '@services';
import { Direction } from '@interfaces';

const directions: Direction[] = [
  { label: 'previous', faIcon: faAngleLeft, class: 'left-0 bg-gradient-to-r' },
  { label: 'next', faIcon: faAngleRight, class: 'right-0 bg-gradient-to-l' }
];

@Component({
  selector: 'control',
  imports: [ FontAwesomeModule ],
  template: `
    @if(getDirection()) {
      <button (click)="onClick()" [class]="getClassButton()">
        <fa-icon class="text-2xl lg:text-3xl" [icon]="getIcon()"></fa-icon>
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Control {
  private carouselService = inject(CarouselService);
  direction = input.required<'previous' | 'next'>();
  background = input.required<string>();
  getDirection = computed<Direction | undefined>(() => directions.find(angle => angle.label === this.direction()));
  getClass = computed<string | undefined>(() => this.getDirection()?.class);
  getIcon = computed<IconDefinition | undefined>(() => this.getDirection()?.faIcon);
  getLabel = computed<string | undefined>(() => this.getDirection()?.label);
  getClassButton = computed<string>(() =>
    `absolute top-1/2 -translate-y-1/2 hover:cursor-pointer h-full ${this.getClass()} ${this.background()} to-transparent z-10 px-2 lg:px-3`
  );

  onClick() {
    (this.getLabel() === 'next')? this.carouselService.next(): this.carouselService.previous();
  }
}
