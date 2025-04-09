import { Component, computed, input } from '@angular/core';
import { environment } from '../../environments/environment.developments';

@Component({
  selector: 'backdrop-image',
  imports: [],
  template: `
    <img class="md:object-cover md:object-center rounded-sm" [src]="backdropImage()"
    [alt]="originalTitle()">
  `
})
export class BackdropImageComponent {
  backdropPath = input.required<string>();
  originalTitle = input.required<string>();
  backdropImage = computed(() => environment.imageUrl + this.backdropPath());
}
