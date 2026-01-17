import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import Search from './search';
import { InfiniteScroll } from '@components/infinite-scroll/infinite-scroll';
import { QueryParamsService, ScrollService, SearchService, SeoFriendlyService } from '@services';
import { MockDefaultQueryParamsService, MockQueryParamsService, MockScrollService, MockSearchService, MockSeoFriendlyService, MockTranslatePipe, StubInfiniteScroll } from '@mocks';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('getMovieByTitle()', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ Search ],
        providers: [
          { provide: SearchService, useClass: MockSearchService },
          { provide: SeoFriendlyService, useClass: MockSeoFriendlyService },
          { provide: QueryParamsService, useClass: MockQueryParamsService },
          { provide: ScrollService, useClass: MockScrollService }
        ]
      })
      .overrideComponent(Search, {
        remove: { imports: [ InfiniteScroll, TranslatePipe ] },
        add: { imports: [ StubInfiniteScroll, MockTranslatePipe ] }
      })
      .compileComponents();

      fixture = TestBed.createComponent(Search);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })

    it('Should render the search component', fakeAsync(() => {
      const getMovieByTitleSpy = jest.spyOn(component['searchService'], 'getMovieByTitle');
      tick();
      fixture.detectChanges();
      const headerElement = fixture.nativeElement.querySelector('h3') as HTMLElement;
      const spanElement = fixture.nativeElement.querySelector('span') as HTMLElement;
      const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
      expect(component.queryParams().query).toBe('Inception');
      expect(getMovieByTitleSpy).toHaveBeenCalledWith('Inception', 1);
      expect(component.paginatedMovies.value()?.length).toBeGreaterThan(0);
      expect(headerElement.textContent).toBe('search.title');
      expect(spanElement.textContent).toBe('Inception');
      expect(infiniteScrollElement).toBeTruthy();
    }))
  })

  describe('getMoviesFiltered()', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ Search ],
        providers: [
          { provide: SearchService, useClass: MockSearchService },
          { provide: SeoFriendlyService, useClass: MockSeoFriendlyService },
          { provide: QueryParamsService, useClass: MockDefaultQueryParamsService },
          { provide: ScrollService, useClass: MockScrollService }
        ]
      })
      .overrideComponent(Search, {
        remove: { imports: [ InfiniteScroll, TranslatePipe ] },
        add: { imports: [ StubInfiniteScroll, MockTranslatePipe ] }
      })
      .compileComponents();

      fixture = TestBed.createComponent(Search);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })

    it('Should render the search component', fakeAsync(() => {
      const getMoviesFilteredSpy = jest.spyOn(component['searchService'], 'getMoviesFiltered');
      tick();
      fixture.detectChanges();
      const headerElement = fixture.nativeElement.querySelector('h3') as HTMLElement;
      const spanElement = fixture.nativeElement.querySelector('span') as HTMLElement;
      const infiniteScrollElement = fixture.nativeElement.querySelector('infinite-scroll');
      expect(component.queryParams().query).toBe('');
      expect(getMoviesFilteredSpy).toHaveBeenCalledWith(component.queryParams(), 1);
      expect(component.paginatedMovies.value()?.length).toBeGreaterThan(0);
      expect(headerElement).toBeFalsy();
      expect(spanElement).toBeFalsy();
      expect(infiniteScrollElement).toBeTruthy();
    }))
  })
})
