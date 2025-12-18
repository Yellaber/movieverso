import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FilterGenre } from './filter-genre';
import { TmdbService } from '@services';
import { mockGenreMovies, MockTmdbService, MockTranslatePipe, MockTranslateService } from '@mocks';

describe('FilterGenre.', () => {
  let fixture: ComponentFixture<FilterGenre>;
  let component: FilterGenre;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FilterGenre ],
      providers: [
        { provide: TmdbService, useClass: MockTmdbService },
        { provide: TranslateService, useClass: MockTranslateService },
      ]
    })
    .overrideComponent(FilterGenre, {
      remove: { imports: [ TranslatePipe ] },
      add: { imports: [ MockTranslatePipe ] },
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterGenre);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('genresIdSelected', '');
    fixture.detectChanges();
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component and not select any genre.', () => {
    const spanElement = fixture.nativeElement.querySelector('span');
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    expect(spanElement).toBeTruthy();
    expect(buttonElements.length).toBe(mockGenreMovies.genres.length);
    expect(component.genresIdSelected()).toEqual('');
    buttonElements.forEach((buttonElement: HTMLButtonElement, index: number) => {
      expect(component.isSelected(mockGenreMovies.genres[index])).toBeFalsy();
      expect(buttonElement.classList.contains('bg-stone-400')).toBeTruthy();
      expect(buttonElement.classList.contains('text-stone-700')).toBeTruthy();
    });
  })

  it('Should select a genre.', () => {
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    buttonElements[1].click();
    fixture.detectChanges();
    const currentGenresIds = `${mockGenreMovies.genres[1].id.toString()}`;
    expect(component.genresIdSelected()).toEqual(currentGenresIds);
    expect(component.isSelected(mockGenreMovies.genres[1])).toBeTruthy();
    expect(buttonElements[1].textContent.trim()).toBe(mockGenreMovies.genres[1].name);
    expect(buttonElements[1].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[1].classList.contains('font-bold')).toBeTruthy();
  })

  it('Should select two genres.', () => {
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    buttonElements[1].click();
    fixture.detectChanges();
    buttonElements[2].click();
    fixture.detectChanges();
    const currentGenresIds = `${mockGenreMovies.genres[1].id.toString()},${mockGenreMovies.genres[2].id.toString()}`;
    expect(component.genresIdSelected()).toEqual(currentGenresIds);
    expect(component.isSelected(mockGenreMovies.genres[1])).toBeTruthy();
    expect(component.isSelected(mockGenreMovies.genres[2])).toBeTruthy();
    expect(buttonElements[1].textContent.trim()).toBe(mockGenreMovies.genres[1].name);
    expect(buttonElements[1].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[1].classList.contains('font-bold')).toBeTruthy();
    expect(buttonElements[2].textContent.trim()).toBe(mockGenreMovies.genres[2].name);
    expect(buttonElements[2].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[2].classList.contains('font-bold')).toBeTruthy();
  })

  it('Should deselect the selected genre.', () => {
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    buttonElements[3].click();
    fixture.detectChanges();
    const currentGenresIds = `${mockGenreMovies.genres[3].id.toString()}`;
    expect(component.genresIdSelected()).toEqual(currentGenresIds);
    expect(component.isSelected(mockGenreMovies.genres[3])).toBeTruthy();
    expect(buttonElements[3].textContent.trim()).toBe(mockGenreMovies.genres[3].name);
    expect(buttonElements[3].classList.contains('bg-yellow-600')).toBeTruthy();
    expect(buttonElements[3].classList.contains('font-bold')).toBeTruthy();
    buttonElements[3].click();
    fixture.detectChanges();
    expect(component.genresIdSelected()).toEqual('');
    expect(component.isSelected(mockGenreMovies.genres[3])).toBeFalsy();
    expect(buttonElements[3].textContent.trim()).toBe(mockGenreMovies.genres[3].name);
    expect(buttonElements[3].classList.contains('bg-stone-400')).toBeTruthy();
    expect(buttonElements[3].classList.contains('text-stone-700')).toBeTruthy();
  })
})
