import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { fireEvent } from '@testing-library/angular';
import { FilterModalMovies } from './filter-modal-movies';
import { ScrollService } from '@services';
import { MockScrollService, MockTranslatePipe, MockTranslateService, StubFormFilter } from '@mocks';
import { FormFilter } from './form-filter/form-filter';

describe('FilterModalMovies.', () => {
  let component: FilterModalMovies;
  let fixture: ComponentFixture<FilterModalMovies>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FilterModalMovies ],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ScrollService, useClass: MockScrollService }
      ]
    })
    .overrideComponent(FilterModalMovies, {
      remove: { imports: [ TranslatePipe, FormFilter ] },
      add: { imports: [ MockTranslatePipe, StubFormFilter ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterModalMovies);
    component = fixture.componentInstance;
  })

  it('Should render and display the filter modal movies.', () => {
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const titleElement = fixture.nativeElement.querySelector('h2') as HTMLElement;
    const formFilterElement = fixture.nativeElement.querySelector('form-filter');
    expect(buttonElement).toBeTruthy();
    expect(titleElement).toBeTruthy();
    expect(formFilterElement).toBeTruthy();
    expect(component.show()).toBe(true);
  })

  it('Should not display the filter modal movies when this is closed.', fakeAsync(() => {
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const titileElement = fixture.nativeElement.querySelector('h2') as HTMLElement;
    const formFilterElement = fixture.nativeElement.querySelector('form-filter');
    expect(buttonElement).toBeTruthy();
    expect(titileElement).toBeTruthy();
    expect(formFilterElement).toBeTruthy();
    fireEvent.click(buttonElement);
    fixture.detectChanges();
    tick(300);
    expect(component.show()).toBe(false);
  }))

  it('Should display the filter modal movies.', fakeAsync(() => {
    const spyBlockWindow = jest.spyOn(component['scrollService'], 'blockWindow');
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();
    component.onShow();
    expect(component.classOverlay()).toBe('fixed inset-0 bg-stone-900/60 items-center justify-center z-50 flex');
    tick(10);
    expect(spyBlockWindow).toHaveBeenCalledWith(true);
    expect(component.classModal()).toBe('w-[330px] lg:w-[430px] bg-stone-300 text-stone-700 rounded-md shadow-md transform transition-all duration-300 translate-y-0 opacity-100');
  }))

  it('Should hide the filter modal movies.', fakeAsync(() => {
    const spyBlockWindow = jest.spyOn(component['scrollService'], 'blockWindow');
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();
    component.onClose();
    expect(component.classModal()).toBe('w-[330px] lg:w-[430px] bg-stone-300 text-stone-700 rounded-md shadow-md transform transition-all duration-300 translate-y-full opacity-0');
    tick(300);
    expect(component.show()).toBe(false);
    expect(spyBlockWindow).toHaveBeenCalledWith(false);
    expect(component.classOverlay()).toBe('fixed inset-0 bg-stone-900/60 items-center justify-center z-50 hidden');
  }))
})
