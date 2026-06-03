import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Credits } from './credits';
import { CarouselCreditSkeleton } from '@components/carousel-credit-skeleton/carousel-credit-skeleton';
import { CarouselCredits } from './carousel-credits/carousel-credits';
import { DetailService } from '@services';
import { MockDetailService, StubCarouselCredits, StubCarouselCreditSkeleton } from '@mocks';

describe('Credits', () => {
  let component: Credits;
  let fixture: ComponentFixture<Credits>;
  let mockDetailService: MockDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Credits ],
      providers: [{ provide: DetailService, useClass: MockDetailService }]
    })
    .overrideComponent(Credits, {
      remove: { imports: [ CarouselCredits, CarouselCreditSkeleton ] },
      add: { imports: [ StubCarouselCredits, StubCarouselCreditSkeleton ]}
    })
    .compileComponents();

    fixture = TestBed.createComponent(Credits);
    component = fixture.componentInstance;
    mockDetailService = TestBed.inject(DetailService) as unknown as MockDetailService;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render skeleton during loading and carousel when cast has members', fakeAsync(() => {
    fixture.componentRef.setInput('idMovie', 123);
    fixture.detectChanges();
    const carouselCreditSkeleton = fixture.nativeElement.querySelector('carousel-credit-skeleton') as HTMLElement;
    expect(component.credit.isLoading()).toBe(true);
    expect(component.credit.hasValue()).toBe(false);
    expect(carouselCreditSkeleton).toBeInTheDocument();
    expect(fixture.nativeElement.style.display).toBe('');
    tick();
    fixture.detectChanges();
    const carouselCreditsElement = fixture.nativeElement.querySelector('carousel-credits') as HTMLElement;
    expect(component.credit.isLoading()).toBe(false);
    expect(component.credit.hasValue()).toBe(true);
    expect(carouselCreditsElement).toBeInTheDocument();
    expect(fixture.nativeElement.style.display).toBe('');
  }))

  it('Should hide host element when cast is empty', fakeAsync(() => {
    mockDetailService.getMovieCredits.mockReturnValue(of({ id: 123, cast: [], crew: [] }));
    fixture.componentRef.setInput('idMovie', 123);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.credit.isLoading()).toBe(false);
    expect(component.credit.hasValue()).toBe(true);
    expect(fixture.nativeElement.style.display).toBe('none');
  }))

  it('Should keep host element visible during loading', fakeAsync(() => {
    fixture.componentRef.setInput('idMovie', 123);
    fixture.detectChanges();
    expect(component.credit.isLoading()).toBe(true);
    expect(fixture.nativeElement.style.display).toBe('');
  }))
})
