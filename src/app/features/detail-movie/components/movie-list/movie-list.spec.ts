import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { MovieList } from './movie-list';
import { CarouselMovies } from '@components/carousel-movies/carousel-movies';
import { CarouselTitle } from '@components/carousel-movies/carousel-title/carousel-title';
import { Notification } from '@components/notification/notification';
import { DetailService } from '@services';
import { MockDetailService, MockTranslateService, StubCarouselMovies, StubCarouselTitle, StubNotification } from '@mocks';

describe('MovieList', () => {
  let component: MovieList;
  let fixture: ComponentFixture<MovieList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MovieList ],
      providers: [
        { provide: DetailService, useClass: MockDetailService },
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    })
    .overrideComponent(MovieList, {
      remove: { imports: [ CarouselMovies, CarouselTitle, Notification ] },
      add: { imports: [ StubCarouselMovies, StubCarouselTitle, StubNotification ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieList);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("Should display the movies' carousel when movieId input is greater than 0", fakeAsync(() => {
    fixture.componentRef.setInput('typeMovieList', 'recommendations');
    fixture.componentRef.setInput('movieId', 123);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const carouselMoviesElement = fixture.nativeElement.querySelector('carousel-movies') as HTMLElement;
    expect(component.movies().length).toBeGreaterThan(0);
    expect(carouselMoviesElement).toBeInTheDocument();
  }))

  it('Should display the title and notification when movieId input is less than 0', fakeAsync(() => {
    fixture.componentRef.setInput('typeMovieList', 'similar');
    fixture.componentRef.setInput('movieId', -1);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title') as HTMLElement;
    const notificationElement = fixture.nativeElement.querySelector('notification') as HTMLElement;
    expect(component.movies().length).toBe(0);
    expect(carouselTitleElement).toBeInTheDocument();
    expect(notificationElement).toBeInTheDocument();
  }))

  it('Should display title and notification when movieId input is 0', fakeAsync(() => {
    fixture.componentRef.setInput('typeMovieList', 'collection');
    fixture.componentRef.setInput('movieId', 0);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title') as HTMLElement;
    const notificationElement = fixture.nativeElement.querySelector('notification') as HTMLElement;
    expect(component.movies().length).toBe(0);
    expect(carouselTitleElement).toBeInTheDocument();
    expect(notificationElement).toBeInTheDocument();
  }))

  it('Should display title and notification when movieId input is undefined', fakeAsync(() => {
    fixture.componentRef.setInput('typeMovieList', 'recommendations');
    fixture.componentRef.setInput('movieId', undefined);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title') as HTMLElement;
    const notificationElement = fixture.nativeElement.querySelector('notification') as HTMLElement;
    expect(component.movies().length).toBe(0);
    expect(carouselTitleElement).toBeInTheDocument();
    expect(notificationElement).toBeInTheDocument();
  }))
})
