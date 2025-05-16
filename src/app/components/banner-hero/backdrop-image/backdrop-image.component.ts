import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { environment } from 'src/app/environments/environment.developments';

@Component({
  selector: 'backdrop-image',
  imports: [],
  template: `
    <img class="md:object-cover md:object-center rounded-sm" [src]="backdropImage()"
    [alt]="originalTitle()" loading="lazy"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden md:flex md:w-1/2 justify-end rounded-md z-10' }
})
export class BackdropImageComponent {
  backdropPath = input.required<string>();
  originalTitle = input.required<string>();
  backdropImage = computed(() => environment.imageUrl + this.backdropPath());
}
