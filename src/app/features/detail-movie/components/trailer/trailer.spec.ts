import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselTitle } from '@components/carousel-movies/carousel-title/carousel-title';
import { Notification } from '@components/notification/notification';
import { IframeVideo } from './iframe-video/iframe-video';
import { Trailer } from './trailer';
import { DetailService } from '@services';
import { MockDetailService, mockTrailers, MockTranslatePipe, StubCarouselTitle, StubIframeVideo, StubNotification } from '@mocks';

describe('Trailer', () => {
  let component: Trailer;
  let fixture: ComponentFixture<Trailer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Trailer ],
      providers: [{ provide: DetailService, useClass: MockDetailService }]
    })
    .overrideComponent(Trailer, {
      remove: { imports: [ CarouselTitle, IframeVideo, Notification, TranslatePipe ] },
      add: { imports: [ StubCarouselTitle, StubIframeVideo, StubNotification, MockTranslatePipe ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trailer);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render carousel title and iframe video components when movieId input is provided', fakeAsync(() => {
    fixture.componentRef.setInput('movieId', 123);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieTrailers = component.movieTrailers;
    const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title') as HTMLElement;
    const iframeVideoElement = fixture.nativeElement.querySelector('iframe-video') as HTMLElement;
    expect(movieTrailers.hasValue()).toBe(true);
    expect(movieTrailers.value()).toBe(mockTrailers);
    expect(carouselTitleElement).toBeInTheDocument();
    expect(iframeVideoElement).toBeInTheDocument();
  }))

  it('Should display carousel title and notification components when movieId input is undefined', fakeAsync(() => {
    fixture.componentRef.setInput('movieId', undefined);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const movieTrailers = component.movieTrailers;
    const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title') as HTMLElement;
    const notificationElement = fixture.nativeElement.querySelector('notification') as HTMLElement;
    expect(movieTrailers.hasValue()).toBe(false);
    expect(carouselTitleElement).toBeInTheDocument();
    expect(notificationElement).toBeInTheDocument();
  }))
})
