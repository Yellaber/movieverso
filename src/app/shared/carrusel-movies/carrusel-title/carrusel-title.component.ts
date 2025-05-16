import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'carrusel-title',
  imports: [ RouterLink ],
  template: `
    <div class="flex justify-between items-center text-yellow-600 font-semibold mb-5">
      <div class="rounded-full bg-stone-800 px-4 py-2">
        <h2 class="text-xl md:text-2xl lg:text-3xl">{{ carruselTitle() }}</h2>
      </div>
      <a class="text-sm lg:text-xl" [routerLink]="route()">Ver todas</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarruselTitleComponent {
  carruselTitle = input.required<string>();
  route = input.required<string>();
}
