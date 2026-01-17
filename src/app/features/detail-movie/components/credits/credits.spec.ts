import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Credits } from './credits';
import { CarouselCreditSkeleton } from '@components/carousel-credit-skeleton/carousel-credit-skeleton';
import { CarouselCredits } from './carousel-credits/carousel-credits';
import { DetailService } from '@services';
import { MockDetailService, StubCarouselCredits, StubCarouselCreditSkeleton } from '@mocks';

describe('Credits', () => {
  let component: Credits;
  let fixture: ComponentFixture<Credits>;

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
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the credits component.', fakeAsync(() => {
    fixture.componentRef.setInput('idMovie', 123);
    fixture.detectChanges();
    const carouselCreditSkeleton = fixture.nativeElement.querySelector('carousel-credit-skeleton') as HTMLElement;
    expect(component.credit.isLoading()).toBe(true);
    expect(component.credit.hasValue()).toBe(false);
    expect(carouselCreditSkeleton).toBeInTheDocument();
    tick();
    fixture.detectChanges();
    const carouselCreditsElement = fixture.nativeElement.querySelector('carousel-credits') as HTMLElement;
    expect(component.credit.isLoading()).toBe(false);
    expect(component.credit.hasValue()).toBe(true);
    expect(carouselCreditsElement).toBeInTheDocument();
  }))
})
