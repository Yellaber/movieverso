import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingComponent } from '@shared/rating/rating.component';
import { FormUtils } from '@app/utilities/form-utils';
import { QueryParams } from '@interfaces/';

@Component({
  selector: 'form-filter',
  imports: [
    ReactiveFormsModule,
    RatingComponent
  ],
  templateUrl: './form-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFilterComponent {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;
  queryParams = signal<QueryParams>({});
  formFilter: FormGroup = this.formBuilder.group({
    voteAverageMinimum: ['7'],
    voteMinimum: [
      '100',
      [Validators.required, Validators.min(1), Validators.max(25000)]
    ],
    primaryReleaseDateGte: [
      '',
      [FormUtils.dateValidator()]
    ],
    primaryReleaseDateLte: [
      '',
      [FormUtils.dateValidator()]
    ]
  }, {
    validators: [FormUtils.isFieldLessThan('primaryReleaseDateGte', 'primaryReleaseDateLte')]
  });

  onShowResults() {
    if(this.formFilter.invalid) {
      this.formFilter.markAllAsTouched();
      return true;
    }
    this.queryParams.set({
      voteAverageGte: this.formFilter.controls['voteAverageMinimum'].value,
      voteCountGte: this.formFilter.controls['voteMinimum'].value,
      primaryReleaseDateGte: this.formFilter.controls['primaryReleaseDateGte'].value,
      primaryReleaseDateLte: this.formFilter.controls['primaryReleaseDateLte'].value,
    });
    return false;
  };

  reset() {
    this.formFilter.reset({
      voteAverageMinimum: '7',
      voteMinimum: '100',
      primaryReleaseDateGte: '',
      primaryReleaseDateLte: ''
    });
  };

  getVoteAverageValue(): number {
    return this.formFilter.controls['voteAverageMinimum'].value;
  };
}
