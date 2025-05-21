import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarruselButtonComponent } from './carrusel-button.component';

describe('CarruselButton Component:', () => {
  let component: CarruselButtonComponent;
  let fixture: ComponentFixture<CarruselButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarruselButtonComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselButtonComponent);
    component = fixture.componentInstance;
  });

  it('Should create component.', () => {
    expect(component).toBeTruthy();
  });

  it('getDirection should return an undefined value.', () => {
    fixture.componentRef.setInput('direction', '');
    fixture.detectChanges();
    expect(component.getDirection()).toBeUndefined();
  });

  it('getDirection should return a Direction object when the next button is clicked.', () => {
    fixture.componentRef.setInput('direction', 'next');
    fixture.detectChanges();
    expect(component.getDirection()).toBeTruthy();
  });

  it('getDirection should return a Direction object when the previous button is clicked.', () => {
    fixture.componentRef.setInput('direction', 'previous');
    fixture.detectChanges();
    expect(component.getDirection()).toBeTruthy();
  });

  it('Should add any classes to classButton when the next button is clicked.', () => {
    fixture.componentRef.setInput('direction', 'next');
    fixture.detectChanges();
    expect(component.getDirection()).toBeTruthy();
    expect(component.classButton).toContain(component.getDirection()!.class);
  });

  it('Should add any classes to classButton when the previous button is clicked.', () => {
    fixture.componentRef.setInput('direction', 'previous');
    fixture.detectChanges();
    expect(component.getDirection()).toBeTruthy();
    expect(component.classButton).toContain(component.getDirection()!.class);
  });

  it('Should emit the emitDirection event when the next button is clicked.', () => {
    fixture.componentRef.setInput('direction', 'next');
    spyOn(component.emitDirection, 'emit');
    fixture.detectChanges();
    expect(component.getDirection()).toBeTruthy();
    expect(component.classButton).toContain(component.getDirection()!.class);
    component.handleChangeScrollState();
    expect(component.emitDirection.emit).toHaveBeenCalledWith(component.getDirection()!.label);
  });

  it('Should emit the emitDirection event when the previous button is clicked.', () => {
    fixture.componentRef.setInput('direction', 'previous');
    spyOn(component.emitDirection, 'emit');
    fixture.detectChanges();
    expect(component.getDirection()).toBeTruthy();
    expect(component.classButton).toContain(component.getDirection()!.class);
    component.handleChangeScrollState();
    expect(component.emitDirection.emit).toHaveBeenCalledWith(component.getDirection()!.label);
  });
});
