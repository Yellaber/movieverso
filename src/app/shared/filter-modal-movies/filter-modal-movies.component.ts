import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FilterGenreComponent } from './filter-genre/filter-genre.component';
import { FilterVoteAverageComponent } from './filter-vote-average/filter-vote-average.component';
import { QueryParamsService, TmdbService } from '@services/';
import { Category, Genre, MovieResponse, QueryParams } from '@interfaces/';

const CLASS_MODAL = 'fixed inset-0 bg-stone-900/60 items-center justify-center z-50 hidden';
const CLASS_MODAL_CONTENT = 'w-full max-w-md bg-stone-300 text-stone-700 rounded-md shadow-md transform transition-all duration-300 translate-y-full opacity-0';

@Component({
  selector: 'filter-modal-movies',
  imports: [
    FontAwesomeModule,
    DecimalPipe,
    //FilterGenreComponent,
    //FilterVoteAverageComponent,
  ],
  templateUrl: './filter-modal-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalMoviesComponent implements OnInit, AfterViewInit {
  faCircleXmark = faCircleXmark;
  faSpinner = faSpinner;
  //currentComponent = input.required<ComponentToFilter>();
  isOpen = input.required<boolean>();
  emitClose = output<boolean>();
  //emitQueryParams = output<QueryParams>();
  /*genresMovieSelected = signal<Genre[]>([]);
  queryParams = signal<QueryParams>({});
  voteAverage = signal<number>(0);*/
  showMovieList = signal<boolean>(false);
  classListModal = signal<string>('');
  classListModalContent = signal<string>('');
  classListFilterContainer = signal<string>('');
  categorySelected = signal<Category | undefined>(undefined);
  totalMovies = rxResource({
    request: this.categorySelected,
    loader: () => this.tmdbService.getMoviesFilteredByCategory(this.categorySelected()!.endPoint, 1)
  });
  private tmdbService = inject(TmdbService);
  //private queryParamsService = inject(QueryParamsService);

  openFilterModal = effect(() => {
    this.isOpen() && this.onShow();
  });

  ngOnInit() {
    this.classListModal.set(CLASS_MODAL);
    this.classListModalContent.set(CLASS_MODAL_CONTENT);
    //this.queryParams.set(this.queryParamsService.get(this.categorySelected().));
  };

  ngAfterViewInit() {
    this.showMovieList.set(false);
  }

  onShow() {
    const classModal = this.classListModal().replace('hidden', 'flex');
    this.classListModal.set(classModal);
    setTimeout(() => {
      const classModalContent = this.classListModalContent().replace('translate-y-full', 'translate-y-0').replace('opacity-0', 'opacity-100');
      this.classListModalContent.set(classModalContent);
    }, 10);
  };

  onClose() {
    const classModalContent = this.classListModalContent().replace('translate-y-0', 'translate-y-full').replace('opacity-100', 'opacity-0');
      this.classListModalContent.set(classModalContent);
    setTimeout(() => {
      const classModal = this.classListModal().replace('flex', 'hidden');
      this.classListModal.set(classModal);
      this.emitClose.emit(false);
    }, 200);
  };

  showResults() {
    this.showMovieList.set(true);
  };

  /*onGenresMovieSelected(event: Genre[]) {
    this.genresMovieSelected.set(event);
    this.queryParams.update(params => ({
      ...params,
      withGenres: this.genresMovieSelected()
    }));
    this.queryParamsService.set(this.currentComponent(), this.queryParams());
    this.emitQueryParams.emit(this.queryParams());
  };*/

  /*onVoteAverage(event: number) {
    this.voteAverage.set(event);
    if(this.genresMovieSelected().length === 0) {
      const queryParams = this.queryParamsService.get(this.currentComponent());
      this.genresMovieSelected.set(queryParams.withGenres!);
    }
    this.queryParams.update(params => ({
      ...params,
      withGenres: this.genresMovieSelected(),
      voteAverageGte: this.voteAverage()
    }));
    this.queryParamsService.set(this.currentComponent(), this.queryParams());
    this.emitQueryParams.emit(this.queryParams());
  };*/

  onCategorySelected(category: Category) {
    this.categorySelected.set(category);
  };
}
