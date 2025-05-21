import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ElementRef, signal } from '@angular/core';
import { CarruselMoviesComponent } from './carrusel-movies.component';
import { mockMovies } from '@shared/mocks/mockMovies';

const mockElementRef = {nativeElement: { offsetWidth: 864 }} as ElementRef<HTMLDivElement>;

describe('CarruselMovies Component:', () => {
  let component: CarruselMoviesComponent;
  let fixture: ComponentFixture<CarruselMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarruselMoviesComponent ],
      providers: [ provideRouter([]) ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselMoviesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('carruselTitle', 'Top-10 Populares');
    fixture.componentRef.setInput('route', '/popular');
    fixture.componentRef.setInput('movies', mockMovies);
    component.carouselContainer = signal(mockElementRef);
    fixture.detectChanges();
  });

  it('Should create component.', () => {
    expect(component).toBeTruthy();
  });

  it('Should increment scrollStep from next().', () => {
    component.next();
    expect(component.scrollStep()).toBe(864);
  });

  it('scrollStep should not to be greater than totalScrollStep from next().', () => {
    component.scrollStep.set(component.totalScrollStep());
    component.next();
    expect(component.scrollStep()).toBe(component.totalScrollStep() - 16);
  });

  it('Should decrement scrollStep from previous().', () => {
    component.scrollStep.set(1296);
    component.previous();
    expect(component.scrollStep()).toBe(432);
  });

  it('scrollStep should not to be less than 0 from previous().', () => {
    component.scrollStep.set(0);
    component.previous();
    expect(component.scrollStep()).toBe(0);
  });

  it('Should call to next() from onClick("next").', () => {
    spyOn(component, 'next');
    component.onClick('next');
    expect(component.next).toHaveBeenCalled();
  });

  it('Should call to previous() from onClick("previous").', () => {
    spyOn(component, 'previous');
    component.onClick('previous');
    expect(component.previous).toHaveBeenCalled();
  });
});
