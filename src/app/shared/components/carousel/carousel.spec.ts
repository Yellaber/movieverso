import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carousel } from './carousel';
import { Control } from './control/control';
import { CarouselCacheService, CarouselService } from '@services';
import { MockCarouselCacheService, MockCarouselService, StubControl } from '@mocks';

describe('Carousel', () => {
  let component: Carousel;
  let fixture: ComponentFixture<Carousel>;
  let mockCacheService: MockCarouselCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Carousel ],
      providers: [
        { provide: CarouselService, useClass: MockCarouselService },
        { provide: CarouselCacheService, useClass: MockCarouselCacheService }
      ]
    })
    .overrideComponent(Carousel, {
      remove: { imports: [ Control ] },
      add: { imports: [ StubControl ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carousel);
    component = fixture.componentInstance;
    mockCacheService = TestBed.inject(CarouselCacheService) as unknown as MockCarouselCacheService;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component correctly when widthCardContainer input is greater than 0', () => {
    const initializerSpy = jest.spyOn(component['carouselService'], 'initializer');
    fixture.componentRef.setInput('totalCards', 20);
    fixture.componentRef.setInput('widthCardContainer', 160);
    fixture.componentRef.setInput('bgControl', 'bg-stone-800/50');
    Object.defineProperty(component.carouselContainer(), 'nativeElement', { value: { offsetWidth: 1600 } });
    fixture.detectChanges();
    const divElement = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    const controlElements = fixture.nativeElement.querySelectorAll('control') as NodeListOf<HTMLDivElement>;
    expect(initializerSpy).toHaveBeenCalledWith(1600, 160, 20);
    expect(divElement).toBeTruthy();
    expect(controlElements.length).toBe(1);
  })

  it('Should render the component incorrectly when widthCardContainer input is 0', () => {
    const initializerSpy = jest.spyOn(component['carouselService'], 'initializer');
    fixture.componentRef.setInput('totalCards', 20);
    fixture.componentRef.setInput('widthCardContainer', 0);
    fixture.componentRef.setInput('bgControl', 'bg-stone-800/50');
    Object.defineProperty(component.carouselContainer(), 'nativeElement', { value: { offsetWidth: 1600 } });
    fixture.detectChanges();
    const divElement = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    const controlElements = fixture.nativeElement.querySelectorAll('control') as NodeListOf<HTMLDivElement>;
    expect(initializerSpy).not.toHaveBeenCalled();
    expect(divElement).toBeTruthy();
    expect(controlElements.length).toBe(0);
  })

  describe('cacheKey: save on ngOnDestroy', () => {
    it('Should save scroll position on destroy when cacheKey is set.', () => {
      fixture.componentRef.setInput('totalCards', 20);
      fixture.componentRef.setInput('widthCardContainer', 160);
      fixture.componentRef.setInput('bgControl', 'bg-stone-800/50');
      fixture.componentRef.setInput('cacheKey', 'home-popular');
      fixture.detectChanges();
      fixture.destroy();
      expect(mockCacheService.savePosition).toHaveBeenCalledWith('home-popular', expect.any(Number));
    });

    it('Should not save scroll position on destroy when cacheKey is not set.', () => {
      fixture.componentRef.setInput('totalCards', 20);
      fixture.componentRef.setInput('widthCardContainer', 160);
      fixture.componentRef.setInput('bgControl', 'bg-stone-800/50');
      fixture.detectChanges();
      fixture.destroy();
      expect(mockCacheService.savePosition).not.toHaveBeenCalled();
    });
  });

  describe('cacheKey: restore on init', () => {
    it('Should restore scroll step from cache when cacheKey and cached value exist.', () => {
      mockCacheService.getPosition.mockReturnValue(800);
      const setScrollStepSpy = jest.spyOn(component['carouselService'], 'setScrollStep');
      fixture.componentRef.setInput('totalCards', 20);
      fixture.componentRef.setInput('widthCardContainer', 160);
      fixture.componentRef.setInput('bgControl', 'bg-stone-800/50');
      fixture.componentRef.setInput('cacheKey', 'home-popular');
      Object.defineProperty(component.carouselContainer(), 'nativeElement', { value: { offsetWidth: 1600 } });
      fixture.detectChanges();
      expect(setScrollStepSpy).toHaveBeenCalledWith(800);
    });

    it('Should not restore scroll step when cacheKey is set but no cached value exists.', () => {
      mockCacheService.getPosition.mockReturnValue(undefined);
      const setScrollStepSpy = jest.spyOn(component['carouselService'], 'setScrollStep');
      fixture.componentRef.setInput('totalCards', 20);
      fixture.componentRef.setInput('widthCardContainer', 160);
      fixture.componentRef.setInput('bgControl', 'bg-stone-800/50');
      fixture.componentRef.setInput('cacheKey', 'home-popular');
      Object.defineProperty(component.carouselContainer(), 'nativeElement', { value: { offsetWidth: 1600 } });
      fixture.detectChanges();
      expect(setScrollStepSpy).not.toHaveBeenCalled();
    });

    it('Should not restore scroll step when no cacheKey is set.', () => {
      mockCacheService.getPosition.mockReturnValue(800);
      const setScrollStepSpy = jest.spyOn(component['carouselService'], 'setScrollStep');
      fixture.componentRef.setInput('totalCards', 20);
      fixture.componentRef.setInput('widthCardContainer', 160);
      fixture.componentRef.setInput('bgControl', 'bg-stone-800/50');
      Object.defineProperty(component.carouselContainer(), 'nativeElement', { value: { offsetWidth: 1600 } });
      fixture.detectChanges();
      expect(setScrollStepSpy).not.toHaveBeenCalled();
    });
  });
})
