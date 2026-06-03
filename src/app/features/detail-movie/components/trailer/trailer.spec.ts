import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
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
  let mockDetailService: MockDetailService;

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
    mockDetailService = TestBed.inject(DetailService) as unknown as MockDetailService;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render carousel title and iframe video components when movieId input is provided', fakeAsync(() => {
    fixture.componentRef.setInput('movieId', 123);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('iframe-video')).not.toBeInTheDocument();
    expect(fixture.nativeElement.querySelector('notification')).not.toBeInTheDocument();
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

  it('Should display notification when getMovieTrailers returns empty array', fakeAsync(() => {
    mockDetailService.getMovieTrailers.mockReturnValue(of([]));
    fixture.componentRef.setInput('movieId', 123);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('notification')).toBeInTheDocument();
    expect(fixture.nativeElement.querySelector('iframe-video')).not.toBeInTheDocument();
  }))

  it('Should display notification when trailer key is empty string', fakeAsync(() => {
    mockDetailService.getMovieTrailers.mockReturnValue(of([{ ...mockTrailers[0], key: '' }]));
    fixture.componentRef.setInput('movieId', 123);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('notification')).toBeInTheDocument();
    expect(fixture.nativeElement.querySelector('iframe-video')).not.toBeInTheDocument();
  }))
})
