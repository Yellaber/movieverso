import { ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FilterGenre } from './filter-genre/filter-genre';
import { FormFilter } from './form-filter/form-filter';
import { FilterOrderBy } from './filter-order-by/filter-order-by';
import { ActiveActionService, QueryParamsService, ScrollService } from '@services';

const CLASS_LIST_OVERLAY = 'fixed inset-0 bg-stone-900/60 items-center justify-center z-50 hidden';
const CLASS_LIST_MODAL = 'w-full max-w-md bg-stone-300 text-stone-700 rounded-md shadow-md transform transition-all duration-300 translate-y-full opacity-0';

@Component({
  selector: 'filter-modal-movies',
  imports: [ FontAwesomeModule, FilterGenre, FormFilter, FilterOrderBy, TranslatePipe ],
  templateUrl: './filter-modal-movies.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalMovies implements OnInit {
  private router = inject(Router);
  private queryParamsService = inject(QueryParamsService);
  private scrollService = inject(ScrollService);
  private activeActionService = inject(ActiveActionService);
  faCircleXmark = faCircleXmark;
  faSpinner = faSpinner;
  filterGenre = viewChild(FilterGenre);
  formFilter = viewChild(FormFilter);
  filterOrderBy = viewChild(FilterOrderBy);
  activeAction = this.activeActionService.getActiveAction;
  classListOverlay = signal<string>(CLASS_LIST_OVERLAY);
  classListModal = signal<string>(CLASS_LIST_MODAL);

  ngOnInit() {
    this.onShow();
  };

  private setClassListOverlay(oldClass: string, newClass: string) {
    const classListOverlay = this.classListOverlay().replace(oldClass, newClass);
    this.classListOverlay.set(classListOverlay);
  };

  private setClassListModal(oldClass: string, newClass: string) {
    const classListModal = this.classListModal().replace(oldClass, newClass);
    this.classListModal.set(classListModal);
  };

  onShow() {
    this.setClassListOverlay('hidden', 'flex');
    setTimeout(() => {
      this.scrollService.blockWindow(true);
      this.setClassListModal('translate-y-full opacity-0', 'translate-y-0 opacity-100');
    }, 10);
  };

  onClose() {
    this.setClassListModal('translate-y-0 opacity-100', 'translate-y-full opacity-0');
    setTimeout(() => {
      this.scrollService.blockWindow(false);
      this.setClassListOverlay('flex', 'hidden');
      this.activeActionService.set('none');
    }, 300);
  };

  onResetFilter() {
    this.filterGenre()?.reset();
    this.formFilter()?.reset();
    this.filterOrderBy()?.reset();
  };

  onShowResults() {
    const formComponent = this.formFilter();
    if(!formComponent) return;
    if(formComponent.isInvalid()) return;
    this.queryParamsService.set({
      primaryReleaseDateGte: formComponent.formFilter.controls[ 'primaryReleaseDateGte' ].value,
      primaryReleaseDateLte: formComponent.formFilter.controls[ 'primaryReleaseDateLte' ].value,
      query: '',
      sortBy: this.filterOrderBy()?.selectedOption()!,
      voteAverageGte: formComponent.formFilter.controls[ 'voteAverageMinimum' ].value,
      voteCountGte: formComponent.formFilter.controls[ 'voteMinimum' ].value,
      withGenres: this.filterGenre()?.genresIdSelected()!,
    });
    this.onClose();
    this.router.navigate(['/search'], { queryParams: {
      genres: this.queryParamsService.getQueryParams().withGenres,
      voteAverageGte: this.queryParamsService.getQueryParams().voteAverageGte,
      voteCountGte: this.queryParamsService.getQueryParams().voteCountGte,
      primaryReleaseDateGte: this.queryParamsService.getQueryParams().primaryReleaseDateGte,
      primaryReleaseDateLte: this.queryParamsService.getQueryParams().primaryReleaseDateLte,
      sortBy: this.queryParamsService.getQueryParams().sortBy
    }});
  };
}
