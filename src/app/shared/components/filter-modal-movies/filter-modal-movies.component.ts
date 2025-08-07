import { ChangeDetectionStrategy, Component, inject, OnInit, output, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FilterGenreComponent } from './filter-genre/filter-genre.component';
import { FormFilterComponent } from './form-filter/form-filter.component';
import { FilterOrderByComponent } from './filter-order-by/filter-order-by.component';
import { ActiveActionService, QueryParamsService, ScrollService } from '@shared/services';

const CLASS_MODAL = 'fixed inset-0 bg-stone-900/60 items-center justify-center z-50 hidden';
const CLASS_MODAL_CONTENT = 'w-full max-w-md bg-stone-300 text-stone-700 rounded-md shadow-md transform transition-all duration-300 translate-y-full opacity-0';

@Component({
  selector: 'filter-modal-movies',
  imports: [
    FontAwesomeModule,
    FilterGenreComponent,
    FormFilterComponent,
    FilterOrderByComponent,
    TranslatePipe
  ],
  templateUrl: './filter-modal-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalMoviesComponent implements OnInit {
  private router = inject(Router);
  private queryParamsService = inject(QueryParamsService);
  private scrollService = inject(ScrollService);
  private activeActionService = inject(ActiveActionService);
  faCircleXmark = faCircleXmark;
  faSpinner = faSpinner;
  emitClose = output();
  filterGenresSelected = viewChild(FilterGenreComponent);
  formFilter = viewChild(FormFilterComponent);
  filterOrderBy = viewChild(FilterOrderByComponent);
  classListModal = signal<string>(CLASS_MODAL);
  classListModalContent = signal<string>(CLASS_MODAL_CONTENT);

  ngOnInit() {
    this.onShow();
  };

  onShow() {
    const classModal = this.classListModal().replace('hidden', 'flex');
    this.classListModal.set(classModal);
    setTimeout(() => {
      this.scrollService.blockWindow(true);
      const classModalContent = this.classListModalContent().replace('translate-y-full', 'translate-y-0').replace('opacity-0', 'opacity-100');
      this.classListModalContent.set(classModalContent);
    }, 10);
  };

  onClose() {
    const classModalContent = this.classListModalContent().replace('translate-y-0', 'translate-y-full').replace('opacity-100', 'opacity-0');
    this.classListModalContent.set(classModalContent);
    setTimeout(() => {
      this.scrollService.blockWindow(false);
      const classModal = this.classListModal().replace('flex', 'hidden');
      this.classListModal.set(classModal);
      this.emitClose.emit();
    }, 200);
  };

  onResetFilter() {
    this.filterGenresSelected()?.reset();
    this.formFilter()?.reset();
    this.filterOrderBy()?.reset();
  };

  onShowResults() {
    const formComponent = this.formFilter();
    if(!formComponent) return;
    const isFormInvalid = formComponent.onShowResults();
    if(isFormInvalid) return;
    this.queryParamsService.set({
      ...formComponent.queryParams(),
      withGenres: this.filterGenresSelected()?.genresIdSelected(),
      sortBy: this.filterOrderBy()?.selectedOption()
    });
    this.onClose();
    this.activeActionService.set('filter');
    this.router.navigateByUrl('/search');
  };
}
