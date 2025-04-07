import { Component, input } from '@angular/core';

@Component({
  selector: 'backdrop-image',
  imports: [],
  template: `
    <img class="md:object-cover md:object-center rounded-sm" [src]="'https://image.tmdb.org/t/p/w500/' + backdropPath()" [alt]="originalTitle()">
  `
})
export class BackdropImageComponent {
  backdropPath = input.required<string>();
  originalTitle = input.required<string>();
}
