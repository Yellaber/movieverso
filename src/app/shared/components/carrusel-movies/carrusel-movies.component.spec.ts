import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarruselMoviesComponent } from './carrusel-movies.component';
import { CarouselMoviesService } from './services/carousel-movies.service';
import { MockCarouselConfig, StubCarruselCardMoviesComponent, StubCarruselControlComponent, StubCarruselTitleComponent } from '@app/testing';

class MockCarouselMoviesService {
  initializer = jest.fn();
  getScrollStep = jest.fn().mockReturnValue(100);
  isPrevious = jest.fn().mockReturnValue(false);
  isNext = jest.fn().mockReturnValue(true);
};

describe('CarruselMoviesComponent.', () => {
  let fixture: ComponentFixture<CarruselMoviesComponent>;
  let component: CarruselMoviesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarruselMoviesComponent ],
      providers: [{ provide: CarouselMoviesService, useClass: MockCarouselMoviesService }]
    })
    .overrideComponent(CarruselMoviesComponent, {
      set: { imports: [ StubCarruselCardMoviesComponent, StubCarruselControlComponent, StubCarruselTitleComponent ] }
    });

    fixture = TestBed.createComponent(CarruselMoviesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('carouselConfig', MockCarouselConfig);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create the component.', () => {
    expect(component).toBeTruthy();
  });

  describe('Should render the carousel movies.', () => {
    it('If the title, text, movies and route are provided.', () => {
      const getScrollStepSpy = jest.spyOn((component as any).carouselMoviesService, 'getScrollStep');
      const isPreviousSpy = jest.spyOn((component as any).carouselMoviesService, 'isPrevious');
      const isNextSpy = jest.spyOn((component as any).carouselMoviesService, 'isNext');
      const carouselTitleElement = fixture.nativeElement.querySelector('carrusel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselMoviesElement = fixture.nativeElement.querySelector('carrusel-card-movies');
      const carouselControlElements = fixture.nativeElement.querySelectorAll('carrusel-control');
      component.getScrollStep();
      component.isPrevious();
      component.isNext();
      expect(component.carouselConfig().carouselTitle).toBe('Carousel Title');
      expect(component.carouselConfig().route).toBe('/route');
      expect(component.carouselConfig().text).toBe('Carousel Text');
      expect(component.carouselConfig().movies.length).toBe(20);
      expect(getScrollStepSpy).toHaveBeenCalled();
      expect(isPreviousSpy).toHaveBeenCalled();
      expect(isNextSpy).toHaveBeenCalled();
      expect(carouselTitleElement).toBeTruthy();
      expect(carouselTextElement).toBeTruthy();
      expect(carouselMoviesElement).toBeTruthy();
      expect(carouselControlElements.length).toBe(1);
    });

    it('If the title, movies and route are provided but the text is not.', () => {
      const getScrollStepSpy = jest.spyOn((component as any).carouselMoviesService, 'getScrollStep');
      const isPreviousSpy = jest.spyOn((component as any).carouselMoviesService, 'isPrevious');
      const isNextSpy = jest.spyOn((component as any).carouselMoviesService, 'isNext');
      fixture.componentRef.setInput('carouselConfig', { ...MockCarouselConfig, text: '' });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carrusel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselMoviesElement = fixture.nativeElement.querySelector('carrusel-card-movies');
      const carouselControlElements = fixture.nativeElement.querySelectorAll('carrusel-control');
      component.getScrollStep();
      component.isPrevious();
      component.isNext();
      expect(component.carouselConfig().carouselTitle).toBe('Carousel Title');
      expect(component.carouselConfig().route).toBe('/route');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(20);
      expect(getScrollStepSpy).toHaveBeenCalled();
      expect(isPreviousSpy).toHaveBeenCalled();
      expect(isNextSpy).toHaveBeenCalled();
      expect(carouselTitleElement).toBeTruthy();
      expect(carouselTextElement).toBeFalsy();
      expect(carouselMoviesElement).toBeTruthy();
      expect(carouselControlElements.length).toBe(1);
    });

    it('If the title and movies are provided but the text and route are not.', () => {
      const getScrollStepSpy = jest.spyOn((component as any).carouselMoviesService, 'getScrollStep');
      const isPreviousSpy = jest.spyOn((component as any).carouselMoviesService, 'isPrevious');
      const isNextSpy = jest.spyOn((component as any).carouselMoviesService, 'isNext');
      fixture.componentRef.setInput('carouselConfig', { ...MockCarouselConfig, route: '', text: '' });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carrusel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselMoviesElement = fixture.nativeElement.querySelector('carrusel-card-movies');
      const carouselControlElements = fixture.nativeElement.querySelectorAll('carrusel-control');
      component.getScrollStep();
      component.isPrevious();
      component.isNext();
      expect(component.carouselConfig().carouselTitle).toBe('Carousel Title');
      expect(component.carouselConfig().route).toBe('');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(20);
      expect(getScrollStepSpy).toHaveBeenCalled();
      expect(isPreviousSpy).toHaveBeenCalled();
      expect(isNextSpy).toHaveBeenCalled();
      expect(carouselTitleElement).toBeTruthy();
      expect(carouselTextElement).toBeFalsy();
      expect(carouselMoviesElement).toBeTruthy();
      expect(carouselControlElements.length).toBe(1);
    });

    it('If only the movies is provided.', () => {
      const getScrollStepSpy = jest.spyOn((component as any).carouselMoviesService, 'getScrollStep');
      const isPreviousSpy = jest.spyOn((component as any).carouselMoviesService, 'isPrevious');
      const isNextSpy = jest.spyOn((component as any).carouselMoviesService, 'isNext');
      fixture.componentRef.setInput('carouselConfig', {
        ...MockCarouselConfig,
        carouselTitle: '',
        route: '',
        text: ''
      });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carrusel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselMoviesElement = fixture.nativeElement.querySelector('carrusel-card-movies');
      const carouselControlElements = fixture.nativeElement.querySelectorAll('carrusel-control');
      component.getScrollStep();
      component.isPrevious();
      component.isNext();
      expect(component.carouselConfig().carouselTitle).toBe('');
      expect(component.carouselConfig().route).toBe('');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(20);
      expect(getScrollStepSpy).toHaveBeenCalled();
      expect(isPreviousSpy).toHaveBeenCalled();
      expect(isNextSpy).toHaveBeenCalled();
      expect(carouselTitleElement).toBeFalsy();
      expect(carouselTextElement).toBeFalsy();
      expect(carouselMoviesElement).toBeTruthy();
      expect(carouselControlElements.length).toBe(1);
    });

    it('If the movies is not provided.', () => {
      const getScrollStepSpy = jest.spyOn((component as any).carouselMoviesService, 'getScrollStep');
      const isPreviousSpy = jest.spyOn((component as any).carouselMoviesService, 'isPrevious');
      const isNextSpy = jest.spyOn((component as any).carouselMoviesService, 'isNext');
      fixture.componentRef.setInput('carouselConfig', {
        movies: [],
        carouselTitle: '',
        route: '',
        text: ''
      });
      fixture.detectChanges();
      const carouselTitleElement = fixture.nativeElement.querySelector('carrusel-title');
      const carouselTextElement = fixture.nativeElement.querySelector('p');
      const carouselMoviesElement = fixture.nativeElement.querySelector('carrusel-card-movies');
      const carouselControlElements = fixture.nativeElement.querySelectorAll('carrusel-control');
      expect(component.carouselConfig().carouselTitle).toBe('');
      expect(component.carouselConfig().route).toBe('');
      expect(component.carouselConfig().text).toBe('');
      expect(component.carouselConfig().movies.length).toBe(0);
      expect(getScrollStepSpy).not.toHaveBeenCalled();
      expect(isPreviousSpy).not.toHaveBeenCalled();
      expect(isNextSpy).not.toHaveBeenCalled();
      expect(carouselTitleElement).toBeFalsy();
      expect(carouselTextElement).toBeFalsy();
      expect(carouselMoviesElement).toBeFalsy();
      expect(carouselControlElements.length).toBe(0);
    });
  });
});
