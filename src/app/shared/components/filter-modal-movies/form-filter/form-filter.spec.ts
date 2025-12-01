import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormFilter } from './form-filter';
import { MockDefaultQueryParamsService, mockQueryParams, MockQueryParamsService, MockTranslatePipe, MockTranslateService, StubRating } from '@mocks';
import { Rating } from '../../rating/rating';
import { initialQueryParams, QueryParamsService } from '@services';
import { fireEvent } from '@testing-library/angular';

describe('FormFilter.', () => {
  let component: FormFilter;
  let fixture: ComponentFixture<FormFilter>;

  describe('When the component is initialized with default values.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FormFilter ],
        providers: [
          FormBuilder,
          { provide: TranslateService, useClass: MockTranslateService },
          { provide: QueryParamsService, useClass: MockDefaultQueryParamsService },
        ]
      })
      .overrideComponent(FormFilter, {
        remove: { imports: [ TranslatePipe, Rating ] },
        add: { imports: [ MockTranslatePipe, StubRating ] }
      })
      .compileComponents();

      fixture = TestBed.createComponent(FormFilter);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('Should render and display the form filter.', () => {
      const ratingElement = fixture.nativeElement.querySelector('rating');
      const rangeElement = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
      const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
      const dateElements = fixture.nativeElement.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
      expect(component).toBeTruthy();
      expect(ratingElement).toBeTruthy();
      expect(rangeElement.value).toEqual(initialQueryParams.voteAverageGte.toString());
      expect(numberElement.value).toEqual(initialQueryParams.voteCountGte.toString());
      expect(dateElements.length).toEqual(2);
      expect(dateElements[0].value).toEqual(initialQueryParams.primaryReleaseDateGte.toString());
      expect(dateElements[1].value).toEqual(initialQueryParams.primaryReleaseDateLte.toString());
    })

    it('Should have a valid form when the form is initialized.', () => {
      expect(component.formFilter.valid).toBe(true);
    })

    describe('When the voteMinimum field is changed.', () => {
      it('Should display a error message when the voteMinimum is less than 1.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: 0 } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.formFilter.invalid).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should display a error message when the voteMinimum is greater than 25000.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: 25001 } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.formFilter.invalid).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should display a error message when the voteMinimum is a negative number.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: -1 } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.formFilter.invalid).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should display a error message when the voteMinimum is empty.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: '' } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.formFilter.invalid).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should not display a error message when the voteMinimum is valid.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: 1000 } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.formFilter.valid).toBe(true);
        expect(errorElement).toBeFalsy();
      })
    })

    describe('When the primaryReleaseDate fields are changed.', () => {
      it('Should display a error message when the primaryReleaseDateGte is greater than the primaryReleaseDateLte.', () => {
        const dateElements = fixture.nativeElement.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
        fireEvent.input(dateElements[0], { target: { value: '2023-01-01' } });
        fireEvent.input(dateElements[1], { target: { value: '2022-01-01' } });
        fireEvent.blur(dateElements[1]);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.formFilter.invalid).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should not display a error message when the primaryReleaseDateGte is less than the primaryReleaseDateLte.', () => {
        const dateElements = fixture.nativeElement.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
        fireEvent.input(dateElements[0], { target: { value: '2022-01-01' } });
        fireEvent.input(dateElements[1], { target: { value: '2023-01-01' } });
        fireEvent.blur(dateElements[1]);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.formFilter.valid).toBe(true);
        expect(errorElement).toBeFalsy();
      })
    })

    describe('isInvalid()', () => {
      it('should return false and not touch the form if it is valid', () => {
        expect(component.formFilter.valid).toBe(true);
        const isInvalid = component.isInvalid();
        expect(isInvalid).toBe(false);
        expect(component.formFilter.touched).toBe(false);
      })

      it('should return true and mark the form as touched if it is invalid', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: '' } });
        fixture.detectChanges();
        expect(component.formFilter.invalid).toBe(true);

        const isInvalid = component.isInvalid();
        expect(isInvalid).toBe(true);
        expect(component.formFilter.touched).toBe(true);
      })
    })
  })

  describe('When the component is initialized with custom values.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FormFilter ],
        providers: [
          FormBuilder,
          { provide: TranslateService, useClass: MockTranslateService },
          { provide: QueryParamsService, useClass: MockQueryParamsService },
        ]
      })
      .overrideComponent(FormFilter, {
        remove: { imports: [ TranslatePipe, Rating ] },
        add: { imports: [ MockTranslatePipe, StubRating ] }
      })
      .compileComponents();

      fixture = TestBed.createComponent(FormFilter);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('Should render and display the form filter with custom values.', () => {
      const ratingElement = fixture.nativeElement.querySelector('rating');
      const rangeElement = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
      const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
      const dateElements = fixture.nativeElement.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
      expect(component).toBeTruthy();
      expect(ratingElement).toBeTruthy();
      expect(rangeElement.value).toEqual(mockQueryParams.voteAverageGte.toString());
      expect(numberElement.value).toEqual(mockQueryParams.voteCountGte.toString());
      expect(dateElements.length).toEqual(2);
      expect(dateElements[0].value).toEqual(mockQueryParams.primaryReleaseDateGte.toString());
      expect(dateElements[1].value).toEqual(mockQueryParams.primaryReleaseDateLte.toString());
    })

    it('Should have a valid form when the form is initialized.', () => {
      expect(component.formFilter.valid).toBe(true);
    })

    it('Should reset the form to its initial default values.', () => {
      const rangeElement = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
      const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.input(rangeElement, { target: { value: initialQueryParams.voteAverageGte.toString() } });
      fireEvent.input(numberElement, { target: { value: initialQueryParams.voteCountGte.toString() } });
      fixture.detectChanges();

      component.reset();
      fixture.detectChanges();
      expect(rangeElement.value).toEqual(initialQueryParams.voteAverageGte.toString());
      expect(numberElement.value).toEqual(initialQueryParams.voteCountGte.toString());
    })
  })
})
