import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ElementRef, viewChildren } from '@angular/core';
import { TmdbService } from '@shared/services';
import { Genre } from '@shared/interfaces';

@Component({
  selector: 'filter-genre',
  imports: [],
  template: `
    <span class="text-sm font-bold">Generos:</span>
    <div class="flex flex-wrap gap-3">
      @for(genre of genres(); track $index) {
        <button #buttonRef class="rounded-full text-xs lg:text-sm bg-stone-400 text-stone-700 hover:font-bold hover:cursor-pointer duration-300 transition-all px-3 py-2"
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
  private buttonRef = viewChildren<ElementRef<HTMLButtonElement>>('buttonRef');
  private tmdbService = inject(TmdbService);

  ngOnInit() {
    this.loadGenreMovieList();
  }

  private loadGenreMovieList() {
    this.tmdbService.getGenreMovieList().subscribe(genres => this.genres.set(genres));
  };

  onSelect(genre: Genre) {
    this.selectGenre(genre);
    this.saveGenreSelected(genre);
  };

  private saveGenreSelected(genre: Genre) {
    this.genresSelected = this.genresSelected.find(genreSelected => genreSelected.id === genre.id)?
    this.genresSelected.filter(genreSelected => genreSelected.id !== genre.id): [ ...this.genresSelected, genre ];
    this.genresIdSelected.set(this.getGenresIdSelected());
  };

  private selectGenre(genre: Genre) {
    this.buttonRef().map(button => {
      const textButton = button.nativeElement.innerText;
      if(textButton === genre.name) {
        if(button.nativeElement.classList.contains('bg-stone-400')) {
          button.nativeElement.classList.replace('bg-stone-400', 'bg-yellow-600');
          button.nativeElement.classList.replace('text-stone-700', 'font-bold');
        } else {
          button.nativeElement.classList.replace('bg-yellow-600', 'bg-stone-400');
          button.nativeElement.classList.replace('font-bold', 'text-stone-700');
        }
      }
      return button;
    });
  };

  private getGenresIdSelected(): string {
    return this.genresSelected.map(genre => genre.id).toString();
  };

  reset() {
    this.buttonRef().map(button => {
      if(button.nativeElement.classList.contains('bg-yellow-600')) {
        button.nativeElement.classList.replace('bg-yellow-600', 'bg-stone-400');
        button.nativeElement.classList.replace('font-bold', 'text-stone-700');
      }
      return button;
    });
    this.genresSelected = [];
    this.genresIdSelected.set('');
  };
}
