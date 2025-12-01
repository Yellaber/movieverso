import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'carousel-title',
  imports: [ RouterLink, TranslatePipe ],
  template: `
    @if(isValidTitle()) {
      <div class="rounded-full bg-yellow-900/50 px-4 py-2">
        <h2 class="text-xl lg:text-2xl">{{ carouselTitle() }}</h2>
      </div>
    }
    @if(isValidRoute()) {
      <a class="text-sm lg:text-xl" [routerLink]="route()">{{ 'carouselLink' | translate }}</a>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex justify-between items-center text-yellow-600 font-semibold mb-5' }
})
export class CarouselTitle {
  carouselTitle = input.required<string>();
  route = input<string>();
  isValidTitle = computed<boolean>(() => !!this.carouselTitle() && this.carouselTitle().trim() !== '');
  isValidRoute = computed<boolean>(() => !!this.route() && this.route()!.trim() !== '');
}
