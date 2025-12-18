import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterSortBy } from './filter-sort-by';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslatePipe, MockTranslateService } from '@mocks';

describe('FilterSortBy.', () => {
  let component: FilterSortBy;
  let fixture: ComponentFixture<FilterSortBy>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FilterSortBy ],
      providers: [{ provide: TranslateService, useClass: MockTranslateService }]
    })
    .overrideComponent(FilterSortBy, {
      remove: { imports: [ TranslatePipe ] },
      add: { imports: [ MockTranslatePipe ] },
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSortBy);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedOption', 'popularity.desc');
    fixture.detectChanges();
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component correctly and select the most popular option.', () => {
    const spanElements: HTMLSpanElement[] = fixture.nativeElement.querySelectorAll('span');
    const buttonElements: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll('button');
    expect(spanElements.length).toBe(1);
    expect(buttonElements.length).toBe(component.options().length);
    expect(buttonElements[0].textContent.trim()).toBe(component.options()[0].label);
    expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();
  });

  it('Should select best rated button if it was clicked.', () => {
    const buttonElements: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll('button');
    buttonElements[2].click();
    fixture.detectChanges();
    expect(buttonElements[0].classList.contains('bg-stone-400')).toBeTruthy();
    expect(buttonElements[0].classList.contains('text-stone-700')).toBeTruthy();
    expect(buttonElements[2].textContent.trim()).toBe(component.options()[2].label);
    expect(buttonElements[2].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[2].classList.contains('font-bold')).toBeTruthy();
  })
})
