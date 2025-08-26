import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { FormUtils } from '@shared/utilities/form-utils';
import { initialQueryParams, QueryParamsService } from '@shared/services/query-params.service';

@Component({
  selector: 'form-filter',
  imports: [
    ReactiveFormsModule,
    RatingComponent,
    TranslatePipe
  ],
  templateUrl: './form-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFilterComponent {
  private formBuilder = inject(FormBuilder);
  private queryParamsService = inject(QueryParamsService);
  queryParams = this.queryParamsService.getQueryParams;
  formUtils = FormUtils;
  formFilter: FormGroup = this.formBuilder.group({
    voteAverageMinimum: [ this.queryParams().voteAverageGte ],
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
  }, {
    validators: [ FormUtils.isFieldLessThan('primaryReleaseDateGte', 'primaryReleaseDateLte') ]
  });

  isInvalid(): boolean {
    if(this.formFilter.invalid) {
      this.formFilter.markAllAsTouched();
      return true;
    }
    return false;
  };

  reset() {
    this.formFilter.reset({
      voteAverageMinimum: initialQueryParams.voteAverageGte,
      voteMinimum: initialQueryParams.voteCountGte,
      primaryReleaseDateGte: initialQueryParams.primaryReleaseDateGte,
      primaryReleaseDateLte: initialQueryParams.primaryReleaseDateLte
    });
  };
};
