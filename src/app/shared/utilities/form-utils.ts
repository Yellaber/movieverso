import { AbstractControl, FormGroup } from '@angular/forms';

export class FormUtils {
  static isValidField(form: FormGroup, fieldName: string) {
    return (!!form.controls[fieldName].errors && form.controls[fieldName].touched);
  };

  static dateValidator() {
    return (control: AbstractControl) => {
      const value: string = control.value;
      if(!value) return null;
      const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      return !dateRegex.test(value)? { invalidDateFormat: true }: null;
    };
  };

  static isFieldLessThan(startDateField: string, endDateField: string) {
    return (formGroup: AbstractControl) => {
      const startDate = formGroup.get(startDateField)?.value;
      const endDate = formGroup.get(endDateField)?.value;
      if(!startDate || !endDate) return null;
      return new Date(startDate) <= new Date(endDate)? null: { dateRangeInvalid: true };
    };
  };
};
