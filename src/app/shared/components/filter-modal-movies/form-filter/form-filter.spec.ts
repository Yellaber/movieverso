import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { fireEvent } from '@testing-library/angular';
import { FormFilter } from './form-filter';
import { MockDefaultQueryParamsService, mockQueryParams, MockQueryParamsService, MockRouter, MockTranslatePipe, MockTranslateService, StubFilterGenre, StubFilterSortBy, StubRating } from '@mocks';
import { Rating } from '../../rating/rating';
import { FilterGenre } from '../filter-genre/filter-genre';
import { FilterSortBy } from '../filter-sort-by/filter-sort-by';
import { initialQueryParams, QueryParamsService } from '@services';

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
          { provide: Router, useClass: MockRouter }
        ]
      })
      .overrideComponent(FormFilter, {
        remove: { imports: [ TranslatePipe, Rating, FilterGenre, FilterSortBy ] },
        add: { imports: [ MockTranslatePipe, StubRating, StubFilterGenre, StubFilterSortBy ] }
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
      const filterGenreElement = fixture.nativeElement.querySelector('filter-genre');
      const ratingElement = fixture.nativeElement.querySelector('rating');
      const rangeElement = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
      const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
      const dateElements = fixture.nativeElement.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
      const filterSortByElement = fixture.nativeElement.querySelector('filter-sort-by');
      expect(filterGenreElement).toBeTruthy();
      expect(ratingElement).toBeTruthy();
      expect(rangeElement.value).toEqual(initialQueryParams.voteAverageGte.toString());
      expect(numberElement.value).toEqual(initialQueryParams.voteCountGte.toString());
      expect(dateElements.length).toEqual(2);
      expect(dateElements[0].value).toEqual(initialQueryParams.primaryReleaseDateGte.toString());
      expect(dateElements[1].value).toEqual(initialQueryParams.primaryReleaseDateLte.toString());
      expect(filterSortByElement).toBeTruthy();
      expect(component.isInvalid()).toBe(false);
    })

    it('Should set query params and navigate to search page when the form is submitted.', () => {
      const spySetQueryParamService = jest.spyOn(component['queryParamService'], 'set');
      const spyNavigate = jest.spyOn(component['router'], 'navigate');
      const buttonElements = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
      fireEvent.click(buttonElements[1]);
      fixture.detectChanges();
      expect(component.isInvalid()).toBe(false);
      expect(spySetQueryParamService).toHaveBeenCalled();
      expect(component.queryParams()).toBe(initialQueryParams);
      expect(spyNavigate).toHaveBeenCalled();
    });

    describe('When the voteMinimum field is changed.', () => {
      it('Should display a error message when the voteMinimum is less than 1.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: 0 } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.isInvalid()).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should display a error message when the voteMinimum is greater than 25000.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: 25001 } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.isInvalid()).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should display a error message when the voteMinimum is a negative number.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: -1 } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.isInvalid()).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should display a error message when the voteMinimum is empty.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: '' } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.isInvalid()).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should not display a error message when the voteMinimum is valid.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: 1000 } });
        fireEvent.blur(numberElement);
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.isInvalid()).toBe(false);
        expect(errorElement).toBeFalsy();
      })
    })

    describe('When the primaryReleaseDate fields are changed.', () => {
      it('Should display a error message when the primaryReleaseDateGte is greater than the primaryReleaseDateLte.', () => {
        const dateElements = fixture.nativeElement.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
        fireEvent.input(dateElements[0], { target: { value: '2023-01-01' } });
        fireEvent.input(dateElements[1], { target: { value: '2022-01-01' } });
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.isInvalid()).toBe(true);
        expect(errorElement).toBeTruthy();
      })

      it('Should not display a error message when the primaryReleaseDateGte is less than the primaryReleaseDateLte.', () => {
        const dateElements = fixture.nativeElement.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
        fireEvent.input(dateElements[0], { target: { value: '2022-01-01' } });
        fireEvent.input(dateElements[1], { target: { value: '2023-01-01' } });
        fixture.detectChanges();
        const errorElement = fixture.nativeElement.querySelector('small') as HTMLElement;
        expect(component.isInvalid()).toBe(false);
        expect(errorElement).toBeFalsy();
      })
    })

    describe('isInvalid()', () => {
      it('Should return false if the form is valid.', () => {
        expect(component.form.invalid).toBe(false);
        expect(component.form.touched).toBe(false);
        expect(component.isInvalid()).toBe(false);
      })

      it('Should return true if the form is invalid and marked as touched.', () => {
        const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
        fireEvent.input(numberElement, { target: { value: '' } });
        fixture.detectChanges();
        expect(component.form.invalid).toBe(true);
        expect(component.form.touched).toBe(true);
        expect(component.isInvalid()).toBe(true);
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
          { provide: Router, useClass: MockRouter }
        ]
      })
      .overrideComponent(FormFilter, {
        remove: { imports: [ TranslatePipe, Rating, FilterGenre, FilterSortBy ] },
        add: { imports: [ MockTranslatePipe, StubRating, StubFilterGenre, StubFilterSortBy ] }
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
      const filterGenreElement = fixture.nativeElement.querySelector('filter-genre');
      const ratingElement = fixture.nativeElement.querySelector('rating');
      const rangeElement = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
      const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
      const dateElements = fixture.nativeElement.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
      const filterSortByElement = fixture.nativeElement.querySelector('filter-sort-by');
      expect(filterGenreElement).toBeTruthy();
      expect(ratingElement).toBeTruthy();
      expect(rangeElement.value).toEqual(mockQueryParams.voteAverageGte.toString());
      expect(numberElement.value).toEqual(mockQueryParams.voteCountGte.toString());
      expect(dateElements.length).toEqual(2);
      expect(dateElements[0].value).toEqual(mockQueryParams.primaryReleaseDateGte.toString());
      expect(dateElements[1].value).toEqual(mockQueryParams.primaryReleaseDateLte.toString());
      expect(filterSortByElement).toBeTruthy();
      expect(component.isInvalid()).toBe(false);
    })

    it('Should reset the form to its initial default values.', () => {
      const filterGenreElement = fixture.nativeElement.querySelector('filter-genre');
      const ratingElement = fixture.nativeElement.querySelector('rating');
      const rangeElement = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
      const numberElement = fixture.nativeElement.querySelector('input[type="number"]') as HTMLInputElement;
      const dateElements = fixture.nativeElement.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
      const filterSortByElement = fixture.nativeElement.querySelector('filter-sort-by');
      const buttonElements = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
      fireEvent.click(buttonElements[0]);
      fixture.detectChanges();
      expect(filterGenreElement).toBeTruthy();
      expect(ratingElement).toBeTruthy();
      expect(rangeElement.value).toEqual(initialQueryParams.voteAverageGte.toString());
      expect(numberElement.value).toEqual(initialQueryParams.voteCountGte.toString());
      expect(dateElements.length).toEqual(2);
      expect(dateElements[0].value).toEqual(initialQueryParams.primaryReleaseDateGte.toString());
      expect(dateElements[1].value).toEqual(initialQueryParams.primaryReleaseDateLte.toString());
      expect(filterSortByElement).toBeTruthy();
      expect(component.isInvalid()).toBe(false);
    })

    it('Should set query params and navigate to search page when the form is submitted.', () => {
      const spySetQueryParamService = jest.spyOn(component['queryParamService'], 'set');
      const spyNavigate = jest.spyOn(component['router'], 'navigate');
      const buttonElements = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
      fireEvent.click(buttonElements[1]);
      fixture.detectChanges();
      expect(component.isInvalid()).toBe(false);
      expect(spySetQueryParamService).toHaveBeenCalled();
      expect(component.queryParams()).toBe(mockQueryParams);
      expect(spyNavigate).toHaveBeenCalled();
    });
  })
})
