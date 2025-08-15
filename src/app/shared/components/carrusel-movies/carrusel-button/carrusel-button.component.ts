import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Direction } from '@shared/interfaces';

const directions: Direction[] = [
  { label: 'previous', faIcon: faAngleLeft, class: 'left-0 bg-gradient-to-r' },
  { label: 'next', faIcon: faAngleRight, class: 'right-0 bg-gradient-to-l' }
];

@Component({
  selector: 'carrusel-button',
  imports: [ FontAwesomeModule ],
  template: `
    @if(getDirection()) {
      <button (click)="handleChangeScrollState()" [class]="classButton()">
        <fa-icon class="text-2xl lg:text-3xl" [icon]="getDirection()!.faIcon"></fa-icon>
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarruselButtonComponent {
  direction = input.required<'previous' | 'next'>();
  bgButton = input.required<string>();
  emitDirection = output<string>();
  getDirection = computed(() => directions.find(angle => angle.label === this.direction()));
  classButton = computed<string>(() => `absolute top-1/2 -translate-y-1/2 hover:cursor-pointer h-full ${this.getDirection()?.class} ${this.bgButton()} to-transparent z-10 px-2 lg:px-3`);

  handleChangeScrollState() {
    this.getDirection() && this.emitDirection.emit(this.getDirection()!.label);
  };
}
