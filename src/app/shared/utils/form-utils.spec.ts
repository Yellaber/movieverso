import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from './form-utils';

describe('FormUtils', () => {
  let form: FormGroup;

  beforeEach(() => {
    form = new FormGroup({
      name: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  })

  describe('isValidField()', () => {
    it('Should return false if the field is valid and untouched', () => {
      form.get('name')?.setValue('test');
      expect(FormUtils.isValidField(form, 'name')).toBe(false);
    })

    it('Should return false if the field is valid and touched', () => {
      form.get('name')?.setValue('test');
      form.get('name')?.markAsTouched();
      expect(FormUtils.isValidField(form, 'name')).toBe(false);
    })

    it('Should return false if the field is invalid and untouched', () => {
      form.get('name')?.setValue('');
      expect(FormUtils.isValidField(form, 'name')).toBe(false);
    })

    it('Should return true if the field is invalid and touched', () => {
      form.get('name')?.setValue('');
      form.get('name')?.markAsTouched();
      expect(FormUtils.isValidField(form, 'name')).toBe(true);
    })
  })

  describe('dateValidator()', () => {
    const dateValidator = FormUtils.dateValidator();

    it('Should return null for a valid date format (YYYY-MM-DD)', () => {
      const control = new FormControl('2025-05-21');
      expect(dateValidator(control)).toBeNull();
    })

    it('Should return { invalidDateFormat: true } for an invalid date format', () => {
      const control = new FormControl('21-05-2025');
      expect(dateValidator(control)).toEqual({ invalidDateFormat: true });
    })

    it('Should return null for an empty string value', () => {
      const control = new FormControl('');
      expect(dateValidator(control)).toBeNull();
    })
  })

  describe('isFieldLessThan()', () => {
    const dateRangeValidator = FormUtils.isFieldLessThan('startDate', 'endDate');

    it('Should return null if startDate and endDate are empty strings', () => {
      form.get('startDate')?.setValue('');
      form.get('endDate')?.setValue('');
      expect(dateRangeValidator(form)).toBeNull();
    })

    it('Should return null if startDate is before endDate', () => {
      form.get('startDate')?.setValue('2025-05-20');
      form.get('endDate')?.setValue('2025-05-21');
      expect(dateRangeValidator(form)).toBeNull();
    })

    it('Should return null if startDate is the same as endDate', () => {
      form.get('startDate')?.setValue('2025-05-21');
      form.get('endDate')?.setValue('2025-05-21');
      expect(dateRangeValidator(form)).toBeNull();
    })

    it('Should return { dateRangeInvalid: true } if startDate is after endDate', () => {
      form.get('startDate')?.setValue('2025-05-22');
      form.get('endDate')?.setValue('2025-05-21');
      expect(dateRangeValidator(form)).toEqual({ dateRangeInvalid: true });
    })
  })
})
