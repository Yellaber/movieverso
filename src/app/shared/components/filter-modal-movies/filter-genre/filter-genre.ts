import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, model, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TmdbService } from '@services';
import { Genre } from '@interfaces';

@Component({
  selector: 'filter-genre',
  imports: [ TranslatePipe ],
  template: `
    <span class="text-sm font-bold">{{ 'filter.genresLabel' | translate }}</span>
    <div class="flex flex-wrap gap-3">
    @for(genre of genres(); track genre.id) {
      <button class="rounded-full text-xs lg:text-sm hover:font-bold hover:cursor-pointer duration-300 transition-all px-3 py-2"
        [class]="isSelected(genre)? 'bg-yellow-600 font-bold': 'bg-stone-400 text-stone-700'" (click)="onSelect(genre)">
        {{ genre.name }}
      </button>
    }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3' }
})
export class FilterGenre implements OnInit {
  private tmdbService = inject(TmdbService);
  genresIdSelected = model.required<string>();
  private genresIds = computed<number[]>(() => this.genresIdSelected().split(',').map(id => parseInt(id)));
  genres = signal<Genre[]>([]);
  private genresSelected = linkedSignal<Genre[]>(() => this.genres().filter(genre => this.genresIds().includes(genre.id)));

  ngOnInit() {
    this.loadGenresMovie();
  }

  private loadGenresMovie() {
    this.tmdbService.getGenresMovie().subscribe(genres =>  this.genres.set(genres));
  }

  onSelect(genreSelected: Genre) {
    this.genresSelected.update(genres => {
      const index = genres.findIndex(genre => genre.id === genreSelected.id);
      if(index > -1) {
        return genres.filter(genre => genre.id !== genreSelected.id);
      }
      return [ ...genres, genreSelected ];
    });
    this.genresIdSelected.set(this.genresSelected().map(genre => genre.id).toString());
  }

  isSelected(genreSelected: Genre): boolean {
    return this.genresSelected().some(genre => genre.id === genreSelected.id);
  }
}
