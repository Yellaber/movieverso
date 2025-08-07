import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'carrusel-title',
  imports: [
    RouterLink,
    TranslatePipe
  ],
  template: `
    @if(carruselTitle()) {
      <div class="rounded-full bg-yellow-900/50 px-4 py-2">
        <h2 class="text-xl lg:text-2xl">{{ carruselTitle() }}</h2>
      </div>
    }
    @if(route()) {
      <a class="text-sm lg:text-xl" [routerLink]="route()">{{ 'carouselLink' | translate }}</a>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex justify-between items-center text-yellow-600 font-semibold mb-5' }
})
export class CarruselTitleComponent {
  carruselTitle = input.required<string>();
  route = input<string>();
}
