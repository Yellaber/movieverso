import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FilterGenreComponent } from './filter-genre.component';
import { TmdbService } from '@shared/services';
import { mockGenreMoviesResponse, MockTmdbService, MockTranslatePipe, MockTranslateService } from '@app/testing';

describe('FilterGenreComponent.', () => {
  let fixture: ComponentFixture<FilterGenreComponent>;
  let component: FilterGenreComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FilterGenreComponent ],
      providers: [
        { provide: TmdbService, useClass: MockTmdbService },
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    })
    .overrideComponent(FilterGenreComponent, {
      remove: { imports: [ TranslatePipe ] },
      add: { imports: [ MockTranslatePipe ] },
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the component correctly.', () => {
    const spanElement = fixture.nativeElement.querySelector('span');
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    expect(component.genres()).toEqual(mockGenreMoviesResponse.genres);
    expect(spanElement).toBeTruthy();
    expect(buttonElements.length).toBe(mockGenreMoviesResponse.genres.length);
  });

  it('Should select a genre.', () => {
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    buttonElements[0].click();
    fixture.detectChanges();
    expect(component.genresIdSelected()).toEqual(mockGenreMoviesResponse.genres[0].id.toString());
    expect(buttonElements[0].textContent.trim()).toBe(mockGenreMoviesResponse.genres[0].name);
    expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();
  });

  it('Should deselect a genre.', () => {
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    buttonElements[0].click();
    fixture.detectChanges();
    expect(component.genresIdSelected()).toEqual(mockGenreMoviesResponse.genres[0].id.toString());
    expect(buttonElements[0].textContent.trim()).toBe(mockGenreMoviesResponse.genres[0].name);
    expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();

    buttonElements[0].click();
    fixture.detectChanges();
    expect(component.genresIdSelected()).toEqual('');
    expect(buttonElements[0].textContent.trim()).toBe(mockGenreMoviesResponse.genres[0].name);
    expect(buttonElements[0].classList.contains('bg-stone-400')).toBeTruthy();
    expect(buttonElements[0].classList.contains('text-stone-700')).toBeTruthy();
  });

  it('Should select and deselect multiple genres.', () => {
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    buttonElements[0].click();
    fixture.detectChanges();
    expect(component.genresIdSelected()).toEqual(mockGenreMoviesResponse.genres[0].id.toString());
    expect(component.isSelected(mockGenreMoviesResponse.genres[0])).toBeTruthy();
    expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();

    buttonElements[1].click();
    fixture.detectChanges();
    expect(component.genresIdSelected()).toEqual(`${mockGenreMoviesResponse.genres[0].id},${mockGenreMoviesResponse.genres[1].id}`);
    expect(component.isSelected(mockGenreMoviesResponse.genres[1])).toBeTruthy();
    expect(buttonElements[1].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[1].classList.contains('font-bold')).toBeTruthy();

    buttonElements[0].click();
    fixture.detectChanges();
    expect(component.genresIdSelected()).toEqual(mockGenreMoviesResponse.genres[1].id.toString());
    expect(component.isSelected(mockGenreMoviesResponse.genres[0])).toBeFalsy();
    expect(buttonElements[0].classList.contains('bg-stone-400')).toBeTruthy();
    expect(buttonElements[0].classList.contains('text-stone-700')).toBeTruthy();
    expect(component.isSelected(mockGenreMoviesResponse.genres[1])).toBeTruthy();
    expect(buttonElements[1].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[1].classList.contains('font-bold')).toBeTruthy();
  });

  it('Should reset selected genres.', () => {
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    buttonElements[0].click();
    fixture.detectChanges();
    expect(component.genresIdSelected()).not.toEqual('');

    component.reset();
    fixture.detectChanges();
    expect(component.genresIdSelected()).toEqual('');
    expect(component.isSelected(mockGenreMoviesResponse.genres[0])).toBeFalsy();
  });
});
