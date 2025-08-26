import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterOrderByComponent } from './filter-order-by.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { QueryParamsService } from '@shared/services';
import { MockDefaultQueryParamsService, MockQueryParamsService, MockTranslatePipe, MockTranslateService } from '@app/testing';

describe('FilterOderByComponent.', () => {
  describe('When initializing with custom query params.', () => {
    let component: FilterOrderByComponent;
    let fixture: ComponentFixture<FilterOrderByComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FilterOrderByComponent ],
        providers: [
          { provide: TranslateService, useClass: MockTranslateService },
          { provide: QueryParamsService, useClass: MockQueryParamsService }
        ]
      })
      .overrideComponent(FilterOrderByComponent, {
        remove: { imports: [ TranslatePipe ] },
        add: { imports: [ MockTranslatePipe ] },
      })
      .compileComponents();

      fixture = TestBed.createComponent(FilterOrderByComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render the component correctly and select the best rated option.', () => {
      const spanElement = fixture.nativeElement.querySelector('span');
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      expect(spanElement).toBeTruthy();
      expect(component.selectedOption()).toBe('vote_average.desc');
      expect(buttonElements.length).toBe(component.options().length);
      expect(component.selectedOption()).toEqual(component.options()[2].value);
      expect(buttonElements[2].textContent.trim()).toBe(component.options()[2].label);
      expect(buttonElements[2].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[2].classList.contains('font-bold')).toBeTruthy();
    });

    it('Should select another option if it is clicked.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      buttonElements[3].click();
      fixture.detectChanges();
      expect(buttonElements[2].classList.contains('bg-stone-400')).toBeTruthy();
      expect(buttonElements[2].classList.contains('text-stone-700')).toBeTruthy();
      expect(component.selectedOption()).toEqual(component.options()[3].value);
      expect(buttonElements[3].textContent.trim()).toBe(component.options()[3].label);
      expect(buttonElements[3].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[3].classList.contains('font-bold')).toBeTruthy();
    });

    it('Should reset the selected option to the first option.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      buttonElements[4].click();
      fixture.detectChanges();
      expect(component.selectedOption()).toEqual(component.options()[4].value);
      expect(buttonElements[4].textContent.trim()).toBe(component.options()[4].label);
      expect(buttonElements[4].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[4].classList.contains('font-bold')).toBeTruthy();

      component.reset();
      fixture.detectChanges();
      expect(buttonElements[4].classList.contains('bg-stone-400')).toBeTruthy();
      expect(buttonElements[4].classList.contains('text-stone-700')).toBeTruthy();
      expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();
    });
  });

  describe('When initializing with default query params.', () => {
    let component: FilterOrderByComponent;
    let fixture: ComponentFixture<FilterOrderByComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FilterOrderByComponent ],
        providers: [
          { provide: TranslateService, useClass: MockTranslateService },
          { provide: QueryParamsService, useClass: MockDefaultQueryParamsService }
        ]
      })
      .overrideComponent(FilterOrderByComponent, {
        remove: { imports: [ TranslatePipe ] },
        add: { imports: [ MockTranslatePipe ] },
      })
      .compileComponents();

      fixture = TestBed.createComponent(FilterOrderByComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Should render the component correctly and select the most popular option by default.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      expect(component.selectedOption()).toBe('popularity.desc');
      expect(component.selectedOption()).toEqual(component.options()[0].value);
      expect(buttonElements[0].textContent.trim()).toBe(component.options()[0].label);
      expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();
    });
  });
});
