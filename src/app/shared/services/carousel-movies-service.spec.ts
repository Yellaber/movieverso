import { TestBed } from '@angular/core/testing';
import { CarouselMoviesService } from './carousel-movies-service';

describe('CarouselMoviesService.', () => {
  let carouselMoviesService: CarouselMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CarouselMoviesService ]
    });
    carouselMoviesService = TestBed.inject(CarouselMoviesService);
  })

  it('Should initialize the service correctly.', () => {
    expect(carouselMoviesService).toBeTruthy();
    carouselMoviesService.initializer(1000, 20);
    expect(carouselMoviesService['scrollStep']()).toBe(0);
    expect(carouselMoviesService.isPrevious()).toBe(false);
    expect(carouselMoviesService.isNext()).toBe(true);
  })

  it('Should increment the scrollStep when next() is called.', () => {
    carouselMoviesService.initializer(1000, 20);
    carouselMoviesService.next();
    expect(carouselMoviesService['scrollStep']()).toBe(880);
    expect(carouselMoviesService.isPrevious()).toBe(true);
    expect(carouselMoviesService.isNext()).toBe(true);
  })

  it('Should decrement the scrollStep when previous() is called.', () => {
    carouselMoviesService.initializer(1000, 20);
    carouselMoviesService.next();
    expect(carouselMoviesService['scrollStep']()).toBe(880);
    expect(carouselMoviesService.isPrevious()).toBe(true);
    expect(carouselMoviesService.isNext()).toBe(true);
    carouselMoviesService.previous();
    expect(carouselMoviesService['scrollStep']()).toBe(0);
  })

  it('Should be isNext() false when scrollStep is on top.', () => {
    carouselMoviesService.initializer(1000, 20);
    carouselMoviesService.next();
    carouselMoviesService.next();
    carouselMoviesService.next();
    expect(carouselMoviesService['scrollStep']()).toBe(2504);
    expect(carouselMoviesService.isPrevious()).toBe(true);
    expect(carouselMoviesService.isNext()).toBe(false);
  })

  it('Should not go below 0 on previous() when already at start.', () => {
    carouselMoviesService.initializer(1000, 20);
    carouselMoviesService.previous();
    expect(carouselMoviesService['scrollStep']()).toBe(0);
  })

  it('Should not exceed totalScrollStep on next() when at end.', () => {
    carouselMoviesService.initializer(1000, 20);
    for (let i = 0; i < 10; i++) carouselMoviesService.next();
    const stepAtEnd = carouselMoviesService['scrollStep']();
    carouselMoviesService.next();
    expect(carouselMoviesService['scrollStep']()).toBe(stepAtEnd);
  })

  it('getScrollStep() should return the current scrollStep.', () => {
    carouselMoviesService.initializer(1000, 20);
    carouselMoviesService.next();
    expect(carouselMoviesService.getScrollStep()).toBe(carouselMoviesService['scrollStep']());
  })
})
