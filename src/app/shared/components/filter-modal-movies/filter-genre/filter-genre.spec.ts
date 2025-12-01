import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FilterGenre } from './filter-genre';
import { QueryParamsService, TmdbService } from '@services';
import { MockDefaultQueryParamsService, mockGenreMovies, mockQueryParams, MockQueryParamsService, MockTmdbService, MockTranslatePipe, MockTranslateService } from '@mocks';

describe('FilterGenre.', () => {
  describe('When initializing with custom query params.', () => {
    let fixture: ComponentFixture<FilterGenre>;
    let component: FilterGenre;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FilterGenre ],
        providers: [
          { provide: TmdbService, useClass: MockTmdbService },
          { provide: TranslateService, useClass: MockTranslateService },
          { provide: QueryParamsService, useClass: MockQueryParamsService }
        ]
      })
      .overrideComponent(FilterGenre, {
        remove: { imports: [ TranslatePipe ] },
        add: { imports: [ MockTranslatePipe ] },
      })
      .compileComponents();

      fixture = TestBed.createComponent(FilterGenre);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render the component and select the genre present in the queryParams.', () => {
      const spanElement = fixture.nativeElement.querySelector('span');
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      expect(spanElement).toBeTruthy();
      expect(buttonElements.length).toBe(mockGenreMovies.genres.length);
      expect(component.genresIdSelected()).toEqual(mockQueryParams.withGenres);
      expect(component.isSelected(mockGenreMovies.genres[0])).toBeTruthy();
      expect(buttonElements[0].textContent.trim()).toBe(mockGenreMovies.genres[0].name);
      expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();
    });

    it('Should select another genre.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      buttonElements[1].click();
      fixture.detectChanges();
      const currentGenresIds = `${mockGenreMovies.genres[0].id.toString()},${mockGenreMovies.genres[1].id.toString()}`;
      expect(component.genresIdSelected()).toEqual(currentGenresIds);
      expect(component.isSelected(mockGenreMovies.genres[0])).toBeTruthy();
      expect(buttonElements[0].textContent.trim()).toBe(mockGenreMovies.genres[0].name);
      expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();
      expect(component.isSelected(mockGenreMovies.genres[1])).toBeTruthy();
      expect(buttonElements[1].textContent.trim()).toBe(mockGenreMovies.genres[1].name);
      expect(buttonElements[1].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[1].classList.contains('font-bold')).toBeTruthy();
    });

    it('Should deselect the genre present in the queryParams.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      buttonElements[0].click();
      fixture.detectChanges();
      expect(component.genresIdSelected()).toEqual('');
      expect(component.isSelected(mockGenreMovies.genres[0])).toBeFalsy();
      expect(buttonElements[0].textContent.trim()).toBe(mockGenreMovies.genres[0].name);
      expect(buttonElements[0].classList.contains('bg-stone-400')).toBeTruthy();
      expect(buttonElements[0].classList.contains('text-stone-700')).toBeTruthy();
    });

    it('Should reset the genres selected.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      fixture.detectChanges();
      expect(component.genresIdSelected()).toEqual(mockGenreMovies.genres[0].id.toString());
      component.reset();
      fixture.detectChanges();
      expect(component.genresIdSelected()).toEqual('');
      expect(component.isSelected(mockGenreMovies.genres[0])).toBeFalsy();
      expect(buttonElements[0].classList.contains('bg-stone-400')).toBeTruthy();
      expect(buttonElements[0].classList.contains('text-stone-700')).toBeTruthy();
    });
  });

  describe('When initializing with default query params.', () => {
    let fixture: ComponentFixture<FilterGenre>;
    let component: FilterGenre;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FilterGenre ],
        providers: [
          { provide: TmdbService, useClass: MockTmdbService },
          { provide: TranslateService, useClass: MockTranslateService },
          { provide: QueryParamsService, useClass: MockDefaultQueryParamsService }
        ]
      })
      .overrideComponent(FilterGenre, {
        remove: { imports: [ TranslatePipe ] },
        add: { imports: [ MockTranslatePipe ] },
      })
      .compileComponents();

      fixture = TestBed.createComponent(FilterGenre);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

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
    });

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
    });
  });
});
