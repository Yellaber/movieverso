import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselMovies } from './carousel-movies';
import { MockCarouselConfig, StubCarousel, StubCarouselTitle, StubPosterMovie, StubFooterPoster } from '@mocks';

// class MockCarouselMoviesService {
//   initializer = jest.fn();
//   getScrollStep = jest.fn().mockReturnValue(100);
//   hasPrevious = jest.fn().mockReturnValue(false);
//   hasNext = jest.fn().mockReturnValue(true);
// };

describe('CarouselMovies.', () => {
  let fixture: ComponentFixture<CarouselMovies>;
  let component: CarouselMovies;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarouselMovies ]
    })
    .overrideComponent(CarouselMovies, {
      set: { imports: [ StubCarousel, StubCarouselTitle, StubPosterMovie, StubFooterPoster ] }
    });

    fixture = TestBed.createComponent(CarouselMovies);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('carouselConfig', MockCarouselConfig);
    fixture.detectChanges();
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should create the component.', () => {
    expect(component).toBeTruthy();
  })

  describe('Should render the carousel movies.', () => {
    it('If the title, text, movies and route are provided.', () => {
      const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselElement = fixture.nativeElement.querySelector('carousel');
      expect(component.carouselConfig().carouselTitle).toBe('Carousel Title');
      expect(component.carouselConfig().route).toBe('/route');
      expect(component.carouselConfig().text).toBe('Carousel Text');
      expect(component.carouselConfig().movies.length).toBe(20);
      expect(carouselTitleElement).toBeTruthy();
      expect(carouselTextElement).toBeTruthy();
      expect(carouselElement).toBeTruthy();
    })

    it('If the title, movies and route are provided but the text is not.', () => {
      fixture.componentRef.setInput('carouselConfig', { ...MockCarouselConfig, text: '' });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselElement = fixture.nativeElement.querySelector('carousel');
      expect(component.carouselConfig().carouselTitle).toBe('Carousel Title');
      expect(component.carouselConfig().route).toBe('/route');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(20);
      expect(carouselTitleElement).toBeTruthy();
      expect(carouselTextElement).toBeFalsy();
      expect(carouselElement).toBeTruthy();
    })

    it('If the title and movies are provided but the text and route are not.', () => {
      fixture.componentRef.setInput('carouselConfig', { ...MockCarouselConfig, route: '', text: '' });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselElement = fixture.nativeElement.querySelector('carousel');
      expect(component.carouselConfig().carouselTitle).toBe('Carousel Title');
      expect(component.carouselConfig().route).toBe('');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(20);
      expect(carouselTitleElement).toBeTruthy();
      expect(carouselTextElement).toBeFalsy();
      expect(carouselElement).toBeTruthy();
    })

    it('If only the movies is provided.', () => {
      fixture.componentRef.setInput('carouselConfig', {
        ...MockCarouselConfig,
        carouselTitle: '',
        route: '',
        text: ''
      });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselElement = fixture.nativeElement.querySelector('carousel');
      expect(component.carouselConfig().carouselTitle).toBe('');
      expect(component.carouselConfig().route).toBe('');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(20);
      expect(carouselTitleElement).toBeFalsy();
      expect(carouselTextElement).toBeFalsy();
      expect(carouselElement).toBeTruthy();
    })

    it('If the movies is not provided.', () => {
      fixture.componentRef.setInput('carouselConfig', {
        movies: [],
        carouselTitle: '',
        route: '',
        text: ''
      });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselElement = fixture.nativeElement.querySelector('carousel-card-movies');
      expect(component.carouselConfig().carouselTitle).toBe('');
      expect(component.carouselConfig().route).toBe('');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(0);
      expect(carouselTitleElement).toBeFalsy();
      expect(carouselTextElement).toBeFalsy();
      expect(carouselElement).toBeFalsy();
    })
  })
})
