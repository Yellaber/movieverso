import { Component, input } from '@angular/core';
import { Genre } from '../../interfaces/genre-movies-response.interface';

@Component({
  selector: 'genre-list',
  imports: [],
  template: `
    <div class="flex items-center gap-3">
      @for(genre of genreList(); track $index) {
        <small class="bg-stone-100 rounded-full text-stone-900 font-semibold px-2.5 py-1.5">{{ genre.name }}</small>
      }
    </div>
  `,
})
export class GenreListComponent {
  genreList = input.required<Genre[]>();
}
