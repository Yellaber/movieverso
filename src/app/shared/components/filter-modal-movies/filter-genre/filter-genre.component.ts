import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { QueryParamsService, TmdbService } from '@shared/services';
import { Genre } from '@shared/interfaces';

@Component({
  selector: 'filter-genre',
  imports: [ TranslatePipe ],
  template: `
    <span class="text-sm font-bold">{{ 'filter.genresLabel' | translate }}</span>
    <div class="flex flex-wrap gap-3">
      @for(genre of genres(); track genre.id) {
        <button
          class="rounded-full text-xs lg:text-sm hover:font-bold hover:cursor-pointer duration-300 transition-all px-3 py-2" [class]="isSelected(genre)? 'bg-yellow-600 font-bold': 'bg-stone-400 text-stone-700'"
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
  private tmdbService = inject(TmdbService);
  private queryParamsService = inject(QueryParamsService);
  private genresSelected = signal<Genre[]>([]);
  genres = signal<Genre[]>([]);
  genresIdSelected = computed(() => this.genresSelected().map(genre => genre.id).toString());

  ngOnInit() {
    this.loadGenreMovieList();
  };

  private loadGenreMovieList() {
    this.tmdbService.getGenreMovieList().subscribe(genres => {
      this.genres.set(genres)
      this.loadGenresIdsFromQueryParamsService();
    });
  };

  private loadGenresIdsFromQueryParamsService() {
    const queryParams = this.queryParamsService.getQueryParams();
    if(queryParams) {
      const genresIdsSelected = queryParams.withGenres;
      if(genresIdsSelected) {
        const genresIds = genresIdsSelected.split(',').map(id => parseInt(id));
        this.genresSelected.set(this.genres().filter(genre => genresIds.includes(genre.id)));
      }
    }
  };

  onSelect(genre: Genre) {
    this.genresSelected.update(currentGenres => {
      const index = currentGenres.findIndex(g => g.id === genre.id);
      if(index > -1) {
        return currentGenres.filter(g => g.id !== genre.id);
      }
      return [ ...currentGenres, genre ];
    });
  };

  isSelected(genre: Genre): boolean {
    return this.genresSelected().some(g => g.id === genre.id);
  };

  reset() {
    this.genresSelected.set([]);
  };
};
