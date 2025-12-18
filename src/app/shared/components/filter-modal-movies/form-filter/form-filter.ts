import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Rating } from '@components/rating/rating';
import { FilterGenre } from '../filter-genre/filter-genre';
import { FilterSortBy } from '../filter-sort-by/filter-sort-by';
import { initialQueryParams, QueryParamsService } from '@services';
import { FormUtils } from '@utils';
import { QueryParams, TypeSort } from '@interfaces';

@Component({
  selector: 'form-filter',
  imports: [ ReactiveFormsModule, Rating, TranslatePipe, FilterGenre, FilterSortBy ],
  templateUrl: './form-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFilter {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private queryParamService = inject(QueryParamsService);
  queryParams = computed<QueryParams>(() => this.queryParamService.getQueryParams());
  withGenres = signal<string>(this.queryParamService.getQueryParams().withGenres);
  sortBy = signal<TypeSort>(this.queryParamService.getQueryParams().sortBy);
  formUtils = FormUtils;
  form: FormGroup = this.formBuilder.group({
    voteAverageMinimum: [
      this.queryParams().voteAverageGte,
      [ Validators.required, Validators.min(0), Validators.max(10) ]
    ],
    voteMinimum: [
      this.queryParams().voteCountGte,
      [ Validators.required, Validators.min(1), Validators.max(25000) ]
    ],
    primaryReleaseDateGte: [
      this.queryParams().primaryReleaseDateGte,
      [ FormUtils.dateValidator() ]
    ],
    primaryReleaseDateLte: [
      this.queryParams().primaryReleaseDateLte,
      [ FormUtils.dateValidator() ]
    ]
  }, { validators: [ FormUtils.isFieldLessThan('primaryReleaseDateGte', 'primaryReleaseDateLte') ] } );

  onReset() {
    this.withGenres.set(initialQueryParams.withGenres);
    this.form.controls['voteAverageMinimum'].setValue(initialQueryParams.voteAverageGte);
    this.form.controls['voteMinimum'].setValue(initialQueryParams.voteCountGte);
    this.form.controls['primaryReleaseDateGte'].setValue(initialQueryParams.primaryReleaseDateGte);
    this.form.controls['primaryReleaseDateLte'].setValue(initialQueryParams.primaryReleaseDateLte);
    this.sortBy.set(initialQueryParams.sortBy);
  }

  onShowResults() {
    this.queryParamService.set({
      withGenres: this.withGenres(),
      voteAverageGte: this.form.controls['voteAverageMinimum'].value,
      voteCountGte: this.form.controls['voteMinimum'].value,
      primaryReleaseDateGte: this.form.controls['primaryReleaseDateGte'].value,
      primaryReleaseDateLte: this.form.controls['primaryReleaseDateLte'].value,
      sortBy: this.sortBy(),
      query: ''
    });
    this.router.navigate(['/search'], { queryParams: {
      genres: this.queryParams().withGenres,
      voteAverageGte: this.queryParams().voteAverageGte,
      voteCountGte: this.queryParams().voteCountGte,
      primaryReleaseDateGte: this.queryParams().primaryReleaseDateGte,
      primaryReleaseDateLte: this.queryParams().primaryReleaseDateLte,
      sortBy: this.queryParams().sortBy
    }});
  }

  isInvalid(): boolean {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return true;
    }
    return false;
  }
}
