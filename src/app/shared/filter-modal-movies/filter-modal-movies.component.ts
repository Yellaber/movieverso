import { ChangeDetectionStrategy, Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FilterGenreComponent } from './filter-genre/filter-genre.component';
import { FilterVoteAverageComponent } from './filter-vote-average/filter-vote-average.component';
import { FilterService } from '@services/';
import { Genre, QueryParams } from '@interfaces/';

const CLASS_MODAL = 'fixed inset-0 bg-stone-900/80 items-center justify-center z-50 hidden';
const CLASS_MODAL_CONTENT = 'w-full max-w-md bg-stone-300 text-stone-700 rounded-md shadow-md transform transition-all duration-300 translate-y-full opacity-0';
const CLASS_FILTER_CONTAINER = 'flex flex-col gap-4 p-6';

@Component({
  selector: 'filter-modal-movies',
  imports: [
    FontAwesomeModule,
    FilterGenreComponent,
    FilterVoteAverageComponent
  ],
  templateUrl: './filter-modal-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalMoviesComponent implements OnInit {
  faCircleXmark = faCircleXmark;
  currentComponent = input.required<string>();
  isOpen = input.required<boolean>();
  emitClose = output<boolean>();
  emitQueryParams = output<QueryParams>();
  genresMovieSelected = signal<Genre[]>([]);
  queryParams = signal<QueryParams>({});
  voteAverage = signal<number>(0);
  classListModal = signal<string>('');
  classListModalContent = signal<string>('');
  classListFilterContainer = signal<string>('');
  private filterService = inject(FilterService);

  openFilterModal = effect(() => {
    this.isOpen() && this.onShow();
  });

  ngOnInit() {
    this.classListModal.set(CLASS_MODAL);
    this.classListModalContent.set(CLASS_MODAL_CONTENT);
    this.loadClassListFilterContainer();
    this.queryParams.set(this.filterService.getQueryParams(this.currentComponent()));
  };

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

  onGenresMovieSelected(event: Genre[]) {
    this.genresMovieSelected.set(event);
    this.queryParams.update(params => ({
      ...params,
      withGenres: this.genresMovieSelected()
    }));
    this.filterService.setQueryParams(this.currentComponent(), this.queryParams());
    this.emitQueryParams.emit(this.queryParams());
  };

  onVoteAverage(event: number) {
    this.voteAverage.set(event);
    if(this.genresMovieSelected().length === 0) {
      const queryParams = this.filterService.getQueryParams(this.currentComponent());
      this.genresMovieSelected.set(queryParams.withGenres!);
    }
    this.queryParams.update(params => ({
      ...params,
      withGenres: this.genresMovieSelected(),
      voteAverageGte: this.voteAverage()
    }));
    this.filterService.setQueryParams(this.currentComponent(), this.queryParams());
    this.emitQueryParams.emit(this.queryParams());
  };

  loadClassListFilterContainer() {
    if(this.currentComponent() === 'upcoming') {
      this.classListFilterContainer.set(CLASS_FILTER_CONTAINER);
      return;
    }
    this.classListFilterContainer.set(`${CLASS_FILTER_CONTAINER} h-70 overflow-y-scroll`);
  };
}
