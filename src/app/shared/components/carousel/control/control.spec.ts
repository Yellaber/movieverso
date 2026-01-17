import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Control } from './control';
import { CarouselService } from '@services';
import { MockCarouselService } from '@mocks';

describe('Control', () => {
  let component: Control;
  let fixture: ComponentFixture<Control>;

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('When direction input is "previous"', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ Control ],
        providers: [{ provide: CarouselService, useClass: MockCarouselService }]
      }).compileComponents();

      fixture = TestBed.createComponent(Control);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('direction', 'previous');
      fixture.componentRef.setInput('background', 'bg-stone-800/50');
      fixture.detectChanges();
    })

    it('Should render the component correctly', () => {
      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(buttonElement).toBeTruthy();
      expect(component.getClass()).toContain('left-0 bg-gradient-to-r');
      expect(component.getIcon()).toBeDefined();
      expect(component.getLabel()).toBe('previous');
      expect(component.getClassButton()).toBe(`absolute top-1/2 -translate-y-1/2 hover:cursor-pointer h-full ${component.getClass()} ${component.background()} to-transparent z-10 px-2 lg:px-3`);
    })

    it('Should call carouselService.previous() when onClick()', () => {
      const previousSpy = jest.spyOn(component['carouselService'], 'previous');
      component.onClick();
      expect(previousSpy).toHaveBeenCalled();
    })
  })

  describe('When direction input is "next"', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ Control ],
        providers: [{ provide: CarouselService, useClass: MockCarouselService }]
      }).compileComponents();

      fixture = TestBed.createComponent(Control);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('direction', 'next');
      fixture.componentRef.setInput('background', 'bg-stone-800/50');
      fixture.detectChanges();
    })

    it('Shoould render the component correctly when direction input is "next"', () => {
      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(buttonElement).toBeTruthy();
      expect(component.getClass()).toContain('right-0 bg-gradient-to-l');
      expect(component.getIcon()).toBeDefined();
      expect(component.getLabel()).toBe('next');
      expect(component.getClassButton()).toBe(`absolute top-1/2 -translate-y-1/2 hover:cursor-pointer h-full ${component.getClass()} ${component.background()} to-transparent z-10 px-2 lg:px-3`);
    })

    it('Should call carouselService.next() when onClick() is called and direction is "next"', () => {
      const nextSpy = jest.spyOn(component['carouselService'], 'next');
      component.onClick();
      expect(nextSpy).toHaveBeenCalled();
    })
  })

  describe('When direction input is an invalid value.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ Control ],
        providers: [{ provide: CarouselService, useClass: MockCarouselService }]
      }).compileComponents();

      fixture = TestBed.createComponent(Control);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('direction', '');
      fixture.componentRef.setInput('background', 'bg-stone-800/50');
      fixture.detectChanges();
    })

    it('Should render the component incorrectly', () => {
      const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(buttonElement).toBeFalsy();
      expect(component.getClass()).toBeUndefined();
      expect(component.getIcon()).toBeUndefined();
      expect(component.getLabel()).toBeUndefined();
      expect(component.getClassButton()).toBe(`absolute top-1/2 -translate-y-1/2 hover:cursor-pointer h-full ${component.getClass()} ${component.background()} to-transparent z-10 px-2 lg:px-3`);
    })
  })
});
