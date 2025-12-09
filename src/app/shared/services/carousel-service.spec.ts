import { TestBed } from '@angular/core/testing';
import { CarouselService } from './carousel-service';

describe('CarouselMoviesService.', () => {
  let carouselService: CarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CarouselService ]
    });
    carouselService = TestBed.inject(CarouselService);
  });

  it('Should initialize the service correctly.', () => {
    expect(carouselService).toBeTruthy();
    carouselService.initializer(1000, 250, 10);
    expect(carouselService.getScrollStep()).toBe(0);
    expect(carouselService.isPrevious()).toBe(false);
    expect(carouselService.isNext()).toBe(true);
  });

  it('Should increment the scrollStep when next() is called.', () => {
    carouselService.initializer(1000, 250, 10);
    carouselService.next();
    expect(carouselService.getScrollStep()).toBe(798);
    expect(carouselService.isPrevious()).toBe(true);
    expect(carouselService.isNext()).toBe(true);
  });

  it('Should decrement the scrollStep when previous() is called.', () => {
    carouselService.initializer(1000, 250, 10);
    carouselService.next();
    expect(carouselService.getScrollStep()).toBe(798);
    expect(carouselService.isPrevious()).toBe(true);
    expect(carouselService.isNext()).toBe(true);
    carouselService.previous();
    expect(carouselService.getScrollStep()).toBe(0);
  });

  it('Should be isNext() false when scrollStep is on top.', () => {
    carouselService.initializer(1000, 250, 10);
    carouselService.next();
    carouselService.next();
    carouselService.next();
    expect(carouselService.getScrollStep()).toBe(1644);
    expect(carouselService.isPrevious()).toBe(true);
    expect(carouselService.isNext()).toBe(false);
  });
});
