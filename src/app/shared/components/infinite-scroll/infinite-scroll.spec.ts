import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { InfiniteScroll } from './infinite-scroll';
import { PosterMovie } from '../poster-movie/poster-movie';
import { FooterPoster } from '../footer-poster/footer-poster';
import { Notification } from '@components/notification/notification';
import { CardMovieSkeleton } from '../carousel-movies-skeleton/card-movie-skeleton/card-movie-skeleton';
import { ScrollService } from '@services';
import { mockPaginatedMovies, MockScrollService, MockTranslatePipe, MockTranslateService, StubCardMovieSkeleton, StubFooterPoster, StubNotification, StubPosterMovie } from '@mocks';
import { fireEvent } from '@testing-library/angular';

describe('InfiniteScroll', () => {
  let component: InfiniteScroll;
  let fixture: ComponentFixture<InfiniteScroll>;

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('When paginatedMovies input contain an array of PaginatedMovies objects', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ InfiniteScroll ],
        providers: [
          { provide: ScrollService, useClass: MockScrollService },
          { provide: TranslateService, useClass: MockTranslateService }
        ]
      })
      .overrideComponent(InfiniteScroll, {
        remove: { imports: [ TranslatePipe, PosterMovie, FooterPoster, Notification, CardMovieSkeleton ] },
        add: { imports: [ MockTranslatePipe, StubPosterMovie, StubFooterPoster, StubNotification, StubCardMovieSkeleton ] }
      })
      .compileComponents();

      fixture = TestBed.createComponent(InfiniteScroll);
      component = fixture.componentInstance;
    });

    it('Should display the first page of movies if isLoading is false', () => {
      const mockResourceRef = {
        value: () => mockPaginatedMovies,
        isLoading: () => false
      };
      fixture.componentRef.setInput('paginatedMovies', mockResourceRef);
      fixture.detectChanges();
      const posterMovieElements = fixture.nativeElement.querySelectorAll('poster-movie') as NodeListOf<HTMLElement>;
      const footerPosterElements = fixture.nativeElement.querySelectorAll('footer-poster') as NodeListOf<HTMLElement>;
      const notificationElement = fixture.nativeElement.querySelector('notification');
      const cardMovieSkeletonElements = fixture.nativeElement.querySelectorAll('card-movie-skeleton') as NodeListOf<HTMLElement>;
      expect(component.getPage()).toBe(1);
      expect(component.paginatedMovies().isLoading()).toBe(false);
      expect(component.movies().length).toBe(mockPaginatedMovies[0].results.length);
      expect(posterMovieElements.length).toBe(mockPaginatedMovies[0].results.length);
      expect(footerPosterElements.length).toBe(mockPaginatedMovies[0].results.length);
      expect(notificationElement).toBeFalsy();
      expect(cardMovieSkeletonElements.length).toBe(0);
    })

    it('Should increase page number by 1 when onWindowScroll method is called', () => {
      const mockResourceRef = {
        value: () => mockPaginatedMovies,
        isLoading: () => false
      };
      const spyOnWindowScroll = jest.spyOn(component, 'onWindowScroll');
      fixture.componentRef.setInput('paginatedMovies', mockResourceRef);
      fixture.detectChanges();
      expect(component.getPage()).toBe(1);
      fireEvent.scroll(window, { target: { scrollY: 500 } });
      fixture.detectChanges();
      expect(spyOnWindowScroll).toHaveBeenCalled();
      expect(component.paginatedMovies().isLoading()).toBe(false);
      expect(component.getPage()).toBe(2);
    })

    it('Should display the card movie skeleton if isLoading is true', () => {
      const mockResourceRef = {
        value: () => mockPaginatedMovies,
        isLoading: () => true
      };
      fixture.componentRef.setInput('paginatedMovies', mockResourceRef);
      fixture.detectChanges();
      const posterMovieElements = fixture.nativeElement.querySelectorAll('poster-movie') as NodeListOf<HTMLElement>;
      const footerPosterElements = fixture.nativeElement.querySelectorAll('footer-poster') as NodeListOf<HTMLElement>;
      const notificationElement = fixture.nativeElement.querySelector('notification');
      const cardMovieSkeletonElements = fixture.nativeElement.querySelectorAll('card-movie-skeleton') as NodeListOf<HTMLElement>;
      expect(component.paginatedMovies().isLoading()).toBe(true);
      expect(component.cardMoviesSkeleton.length).toBe(20);
      expect(posterMovieElements.length).toBe(0);
      expect(footerPosterElements.length).toBe(0);
      expect(notificationElement).toBeFalsy();
      expect(cardMovieSkeletonElements.length).toBe(20);
    })
  })

  describe('When paginatedMovies input contain an empty array', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ InfiniteScroll ],
        providers: [
          { provide: ScrollService, useClass: MockScrollService },
          { provide: TranslateService, useClass: MockTranslateService }
        ]
      })
      .overrideComponent(InfiniteScroll, {
        remove: { imports: [ TranslatePipe, PosterMovie, FooterPoster, Notification, CardMovieSkeleton ] },
        add: { imports: [ MockTranslatePipe, StubPosterMovie, StubFooterPoster, StubNotification, StubCardMovieSkeleton ] }
      })
      .compileComponents();

      fixture = TestBed.createComponent(InfiniteScroll);
      component = fixture.componentInstance;
    });

    it('Should display the first page of movies if isLoading is false', () => {
      const mockResourceRef = {
        value: () => [],
        isLoading: () => false
      };
      fixture.componentRef.setInput('paginatedMovies', mockResourceRef);
      fixture.detectChanges();
      const posterMovieElements = fixture.nativeElement.querySelectorAll('poster-movie') as NodeListOf<HTMLElement>;
      const footerPosterElements = fixture.nativeElement.querySelectorAll('footer-poster') as NodeListOf<HTMLElement>;
      const notificationElement = fixture.nativeElement.querySelector('notification');
      const cardMovieSkeletonElements = fixture.nativeElement.querySelectorAll('card-movie-skeleton') as NodeListOf<HTMLElement>;
      expect(component.paginatedMovies().isLoading()).toBe(false);
      expect(component.movies().length).toBe(0);
      expect(posterMovieElements.length).toBe(0);
      expect(footerPosterElements.length).toBe(0);
      expect(notificationElement).toBeTruthy();
      expect(cardMovieSkeletonElements.length).toBe(0);
    })

    it('Should display the card movie skeleton if isLoading is true', () => {
      const mockResourceRef = {
        value: () => [],
        isLoading: () => true
      };
      fixture.componentRef.setInput('paginatedMovies', mockResourceRef);
      fixture.detectChanges();
      const posterMovieElements = fixture.nativeElement.querySelectorAll('poster-movie') as NodeListOf<HTMLElement>;
      const footerPosterElements = fixture.nativeElement.querySelectorAll('footer-poster') as NodeListOf<HTMLElement>;
      const notificationElement = fixture.nativeElement.querySelector('notification');
      const cardMovieSkeletonElements = fixture.nativeElement.querySelectorAll('card-movie-skeleton') as NodeListOf<HTMLElement>;
      expect(component.paginatedMovies().isLoading()).toBe(true);
      expect(component.cardMoviesSkeleton.length).toBe(20);
      expect(posterMovieElements.length).toBe(0);
      expect(footerPosterElements.length).toBe(0);
      expect(notificationElement).toBeFalsy();
      expect(cardMovieSkeletonElements.length).toBe(20);
    })
  })

  describe('When paginatedMovies input is undefined', () => {
    const mockResourceRef = {
      value: () => undefined,
      isLoading: () => false
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ InfiniteScroll ],
        providers: [
          { provide: ScrollService, useClass: MockScrollService },
          { provide: TranslateService, useClass: MockTranslateService }
        ]
      })
      .overrideComponent(InfiniteScroll, {
        remove: { imports: [ TranslatePipe, PosterMovie, FooterPoster, Notification, CardMovieSkeleton ] },
        add: { imports: [ MockTranslatePipe, StubPosterMovie, StubFooterPoster, StubNotification, StubCardMovieSkeleton ] }
      })
      .compileComponents();

      fixture = TestBed.createComponent(InfiniteScroll);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('paginatedMovies', mockResourceRef);
      fixture.detectChanges();
    });

    it('Movies computed signal should be an empty array', () => {
      expect(component.movies().length).toBe(0);
    })

    it('HasNextPage computed signal should be false', () => {
      expect(component.hasNextPage()).toBe(false);
    })
  })

  it('Should reset the pagination when reset method is called', () => {
    const spyReset = jest.spyOn(component['paginationUtils'], 'reset');
    component.reset();
    expect(spyReset).toHaveBeenCalled();
    expect(component.getPage()).toBe(1);
  })
})
