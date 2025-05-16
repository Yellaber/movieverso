import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface Direction {
  label: string,
  faIcon: IconDefinition
}

const directions: Direction[] = [
  {
    label: 'previous',
    faIcon: faAngleLeft
  },
  {
    label: 'next',
    faIcon: faAngleRight
  }
];

@Component({
  selector: 'carrusel-button',
  imports: [ FontAwesomeModule ],
  template: `
    <button (click)="onClick()" class="absolute left-0 top-1/2 -translate-y-1/2 hover:cursor-pointer h-full bg-linear-to-r from-stone-900 to-transparent z-10 px-2 lg:px-3">
      <fa-icon class="text-2xl lg:text-3xl" [icon]="getDirection()!.faIcon"></fa-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarruselButtonComponent {
  direction = input.required<string>();
  handle = input.required<() => void>();

  onClick() {
    this.handle();
  }

  getDirection(): Direction | undefined {
    return directions.find(angle => (angle.label === this.direction()) && angle);
  }
}
