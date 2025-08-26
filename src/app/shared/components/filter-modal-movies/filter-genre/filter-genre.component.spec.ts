import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FilterGenreComponent } from './filter-genre.component';
import { QueryParamsService, TmdbService } from '@shared/services';
import { MockDefaultQueryParamsService, mockGenreMoviesResponse, mockQueryParams, MockQueryParamsService, MockTmdbService, MockTranslatePipe, MockTranslateService } from '@app/testing';

describe('FilterGenreComponent.', () => {
  describe('When initializing with custom query params.', () => {
    let fixture: ComponentFixture<FilterGenreComponent>;
    let component: FilterGenreComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FilterGenreComponent ],
        providers: [
          { provide: TmdbService, useClass: MockTmdbService },
          { provide: TranslateService, useClass: MockTranslateService },
          { provide: QueryParamsService, useClass: MockQueryParamsService }
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

    it('Should render the component and select the genre present in the queryParams.', () => {
      const spanElement = fixture.nativeElement.querySelector('span');
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      expect(spanElement).toBeTruthy();
      expect(buttonElements.length).toBe(mockGenreMoviesResponse.genres.length);
      expect(component.genresIdSelected()).toEqual(mockQueryParams.withGenres);
      expect(component.isSelected(mockGenreMoviesResponse.genres[0])).toBeTruthy();
      expect(buttonElements[0].textContent.trim()).toBe(mockGenreMoviesResponse.genres[0].name);
      expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();
    });

    it('Should select another genre.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      buttonElements[1].click();
      fixture.detectChanges();
      const currentGenresIds = `${mockGenreMoviesResponse.genres[0].id.toString()},${mockGenreMoviesResponse.genres[1].id.toString()}`;
      expect(component.genresIdSelected()).toEqual(currentGenresIds);
      expect(component.isSelected(mockGenreMoviesResponse.genres[0])).toBeTruthy();
      expect(buttonElements[0].textContent.trim()).toBe(mockGenreMoviesResponse.genres[0].name);
      expect(buttonElements[0].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[0].classList.contains('font-bold')).toBeTruthy();
      expect(component.isSelected(mockGenreMoviesResponse.genres[1])).toBeTruthy();
      expect(buttonElements[1].textContent.trim()).toBe(mockGenreMoviesResponse.genres[1].name);
      expect(buttonElements[1].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[1].classList.contains('font-bold')).toBeTruthy();
    });

    it('Should deselect the genre present in the queryParams.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      buttonElements[0].click();
      fixture.detectChanges();
      expect(component.genresIdSelected()).toEqual('');
      expect(component.isSelected(mockGenreMoviesResponse.genres[0])).toBeFalsy();
      expect(buttonElements[0].textContent.trim()).toBe(mockGenreMoviesResponse.genres[0].name);
      expect(buttonElements[0].classList.contains('bg-stone-400')).toBeTruthy();
      expect(buttonElements[0].classList.contains('text-stone-700')).toBeTruthy();
    });

    it('Should reset the genres selected.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      fixture.detectChanges();
      expect(component.genresIdSelected()).toEqual(mockGenreMoviesResponse.genres[0].id.toString());

      component.reset();
      fixture.detectChanges();
      expect(component.genresIdSelected()).toEqual('');
      expect(component.isSelected(mockGenreMoviesResponse.genres[0])).toBeFalsy();
      expect(buttonElements[0].classList.contains('bg-stone-400')).toBeTruthy();
      expect(buttonElements[0].classList.contains('text-stone-700')).toBeTruthy();
    });
  });

  describe('When initializing with default query params.', () => {
    let fixture: ComponentFixture<FilterGenreComponent>;
    let component: FilterGenreComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FilterGenreComponent ],
        providers: [
          { provide: TmdbService, useClass: MockTmdbService },
          { provide: TranslateService, useClass: MockTranslateService },
          { provide: QueryParamsService, useClass: MockDefaultQueryParamsService }
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

    it('Should render the component and not select any genre.', () => {
      const spanElement = fixture.nativeElement.querySelector('span');
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      expect(spanElement).toBeTruthy();
      expect(buttonElements.length).toBe(mockGenreMoviesResponse.genres.length);
      expect(component.genresIdSelected()).toEqual('');
      buttonElements.forEach((buttonElement: HTMLButtonElement, index: number) => {
        expect(component.isSelected(mockGenreMoviesResponse.genres[index])).toBeFalsy();
        expect(buttonElement.classList.contains('bg-stone-400')).toBeTruthy();
        expect(buttonElement.classList.contains('text-stone-700')).toBeTruthy();
      });
    });

    it('Should select a genre.', () => {
      const buttonElements = fixture.nativeElement.querySelectorAll('button');
      buttonElements[1].click();
      fixture.detectChanges();
      const currentGenresIds = `${mockGenreMoviesResponse.genres[1].id.toString()}`;
      expect(component.genresIdSelected()).toEqual(currentGenresIds);
      expect(component.isSelected(mockGenreMoviesResponse.genres[1])).toBeTruthy();
      expect(buttonElements[1].textContent.trim()).toBe(mockGenreMoviesResponse.genres[1].name);
      expect(buttonElements[1].classList.contains('bg-yellow-600')).toBeTruthy();
      expect(buttonElements[1].classList.contains('font-bold')).toBeTruthy();
    });
  });
});
