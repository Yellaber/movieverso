import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carousel } from './carousel';
import { Control } from './control/control';
import { CarouselService } from '@services';
import { MockCarouselService, StubControl } from '@mocks';

describe('Carousel', () => {
  let component: Carousel;
  let fixture: ComponentFixture<Carousel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Carousel ],
      providers: [{ provide: CarouselService, useClass: MockCarouselService }]
    })
    .overrideComponent(Carousel, {
      remove: { imports: [ Control ] },
      add: { imports: [ StubControl ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carousel);
    component = fixture.componentInstance;
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
})
