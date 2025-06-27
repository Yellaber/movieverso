import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal, output } from '@angular/core';
import { Genre } from '@interfaces/';
import { TmdbService } from '@services/';

@Component({
  selector: 'filter-genre',
  imports: [],
  template: `
    <h3 class="text-sm font-bold">Generos:</h3>
    <div class="flex flex-wrap w-full">
      @for(genre of genresMovies(); track $index) {
        <div class="flex-1/2 lg:flex-1/3 hover:text-stone-950 duration-300 transition-all space-x-1.5 pb-3">
          <input type="checkbox" [id]="genre.name.toLocaleLowerCase()" (click)="saveGenreMovieSelected(genre)"
          [checked]="isGenreMoviesSelected(genre)" class="accent-yellow-600"/>
          <label class="text-xs md:text-sm" [for]="genre.name.toLocaleLowerCase()">{{ genre.name }}</label>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3' }
})
export class FilterGenreComponent implements OnInit {
  genresMovieSelected: Genre[] = [];
  genresMovies = signal<Genre[]>([]);
  genresSelected = input.required<Genre[]>();
  emitGenresMovieSelected = output<Genre[]>();
  private tmdbService = inject(TmdbService);

  ngOnInit() {
    this.loadGenreMovieList();
  }

  loadGenreMovieList() {
    this.tmdbService.getGenreMovieList().subscribe(genres => this.genresMovies.set(genres));
    if(this.genresSelected().length > 0) {
      this.genresMovieSelected = this.genresSelected();
    }
  };

  saveGenreMovieSelected(genre: Genre) {
    this.genresMovieSelected = this.genresMovieSelected.find(genreSelected => genreSelected.id === genre.id)?
    this.genresMovieSelected.filter(genreSelected => genreSelected.id !== genre.id): [ ...this.genresMovieSelected, genre ];
    console.log('GenresSelected: ', this.genresMovieSelected);
    this.emitGenresMovieSelected.emit(this.genresMovieSelected);
  };

  isGenreMoviesSelected(genreClicked: Genre): boolean {
    return this.genresMovieSelected.includes(genreClicked);
  };
}
