import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carousel } from '@components/carousel/carousel';
import { CarouselCredits } from './carousel-credits';
import { CastProfile } from './cast-profile/cast-profile';
import { mockMovieCredit, StubCarousel } from '@mocks';

describe('CarouselCredits', () => {
  let component: CarouselCredits;
  let fixture: ComponentFixture<CarouselCredits>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarouselCredits ]
    })
    .overrideComponent(CarouselCredits, {
      remove: { imports: [ Carousel, CastProfile ] },
      add: { imports: [ StubCarousel ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselCredits);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the carousel credits component', () => {
    fixture.componentRef.setInput('credit', mockMovieCredit);
    fixture.detectChanges();
    const carouselElement = fixture.nativeElement.querySelector('carousel') as HTMLElement;
    const cast = mockMovieCredit.cast;
    expect(carouselElement).toBeInTheDocument();
    expect(component.getTotalCast()).toBe(cast.length);
    expect(component.getWidthCardContainer()).toBe(0);
  })
})
