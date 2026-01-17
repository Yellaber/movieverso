import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselMovies } from './carousel-movies';
import { Carousel } from '../carousel/carousel';
import { CarouselTitle } from './carousel-title/carousel-title';
import { PosterMovie } from '../poster-movie/poster-movie';
import { FooterPoster } from '../footer-poster/footer-poster';
import { MockCarouselConfig, StubCarousel, StubCarouselTitle } from '@mocks';

describe('CarouselMovies', () => {
  let fixture: ComponentFixture<CarouselMovies>;
  let component: CarouselMovies;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarouselMovies ]
    })
    .overrideComponent(CarouselMovies, {
      remove: { imports: [ Carousel, CarouselTitle, PosterMovie, FooterPoster ] },
      add: { imports: [ StubCarousel, StubCarouselTitle ] }
    });

    fixture = TestBed.createComponent(CarouselMovies);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('carouselConfig', MockCarouselConfig);
    fixture.detectChanges();
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('Should render the carousel movies component', () => {
    it('If the title, text, movies and route are provided.', () => {
      const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselElement = fixture.nativeElement.querySelector('carousel');
      expect(component.carouselConfig().carouselTitle).toBe('Carousel Title');
      expect(component.carouselConfig().text).toBe('Carousel Text');
      expect(component.carouselConfig().movies.length).toBe(10);
      expect(carouselTitleElement).toBeInTheDocument();
      expect(carouselTextElement).toBeInTheDocument();
      expect(carouselElement).toBeInTheDocument();
    })

    it('If the title and movies are provided but the text is not', () => {
      fixture.componentRef.setInput('carouselConfig', { ...MockCarouselConfig, text: '' });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselElement = fixture.nativeElement.querySelector('carousel');
      expect(component.carouselConfig().carouselTitle).toBe('Carousel Title');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(10);
      expect(carouselTitleElement).toBeInTheDocument();
      expect(carouselTextElement).not.toBeInTheDocument();
      expect(carouselElement).toBeInTheDocument();
    })

    it('If only the movies is provided', () => {
      fixture.componentRef.setInput('carouselConfig', {
        ...MockCarouselConfig,
        carouselTitle: '',
        text: ''
      });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselElement = fixture.nativeElement.querySelector('carousel');
      expect(component.carouselConfig().carouselTitle).toBe('');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(10);
      expect(carouselTitleElement).not.toBeInTheDocument();
      expect(carouselTextElement).not.toBeInTheDocument();
      expect(carouselElement).toBeInTheDocument();
    })

    it('If the movies is not provided', () => {
      fixture.componentRef.setInput('carouselConfig', {
        movies: [],
        carouselTitle: '',
        text: ''
      });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carousel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselElement = fixture.nativeElement.querySelector('carousel-card-movies');
      expect(component.carouselConfig().carouselTitle).toBe('');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(0);
      expect(carouselTitleElement).not.toBeInTheDocument();;
      expect(carouselTextElement).not.toBeInTheDocument();;
      expect(carouselElement).not.toBeInTheDocument();;
    })
  })
})
