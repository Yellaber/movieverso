import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TmdbService } from '@shared/services';
import { Genre } from '@shared/interfaces';

@Component({
  selector: 'filter-genre',
  imports: [],
  template: `
    <span class="text-sm font-bold">Géneros:</span>
    <div class="flex flex-wrap gap-3">
      @for(genre of genres(); track $index) {
        <button class="rounded-full text-xs lg:text-sm hover:font-bold hover:cursor-pointer duration-300 transition-all px-3 py-2"
        [class.bg-yellow-600]="isSelected(genre)"
        [class.font-bold]="isSelected(genre)"
        [class.bg-stone-400]="!isSelected(genre)"
        [class.text-stone-700]="!isSelected(genre)"
        (click)="onSelect(genre)">
          {{ genre.name }}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3' }
})
export class FilterGenreComponent implements OnInit {
  genres = signal<Genre[]>([]);
  genresIdSelected = signal<string>('');
  private genresSelected: Genre[] = [];
  private tmdbService = inject(TmdbService);

  ngOnInit() {
    this.loadGenreMovieList();
  }

  private loadGenreMovieList() {
    this.tmdbService.getGenreMovieList().subscribe(genres => this.genres.set(genres));
  };

  onSelect(genre: Genre) {
    this.genresSelected = this.genresSelected.find(genreSelected => genreSelected.id === genre.id)?
    this.genresSelected.filter(genreSelected => genreSelected.id !== genre.id): [ ...this.genresSelected, genre ];
    this.genresIdSelected.set(this.getGenresIdSelected());
  };

  private getGenresIdSelected(): string {
    return this.genresSelected.map(genre => genre.id).toString();
  };

  isSelected(genre: Genre): boolean {
    return this.genresSelected.some(g => g.id === genre.id);
  };

  reset() {
    this.genresSelected = [];
    this.genresIdSelected.set('');
  };
}
