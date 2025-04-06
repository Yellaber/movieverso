import { Component, input } from '@angular/core';

@Component({
  selector: 'carrusel-card-movies',
  imports: [],
  template: `
    <div class="min-w-[200px] max-w-[200px] rounded-md shadow-md">
      <img class="w-full h-72 rounded-md object-cover object-center"
      [src]="'https://image.tmdb.org/t/p/w185/' + posterPath()">
    </div>
  `
})
export class CarruselCardMoviesComponent {
  posterPath = input.required<string>();
}
