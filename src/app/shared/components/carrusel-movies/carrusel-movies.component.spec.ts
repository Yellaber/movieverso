import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ElementRef, signal } from '@angular/core';
import { CarruselMoviesComponent } from './carrusel-movies.component';
import { mockMovies } from '@shared/mocks/mockMovies';
import { CarouselConfig } from '@app/shared/interfaces';

const mockCarouselConfig: CarouselConfig = {
  carouselTitle: 'Próximamente',
  movies: mockMovies,
  route: '/upcoming',
  bgButtons: 'from-stone-900',
  bgCardFooter: 'bg-stone-800'
};

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
    fixture.componentRef.setInput('carouselConfig', mockCarouselConfig);
    component.carouselContainer = signal(mockElementRef);
    fixture.detectChanges();
  });

  it('Should create component.', () => {
    expect(component).toBeTruthy();
  });

  it('Should increment scrollStep from next().', () => {
    component.next();
    expect(component.scrollStep()).toBe(704);
  });

  it('scrollStep + scrollVisibleMovies should be greater than totalScrollStep from next().', () => {
    component.scrollStep.set(704);
    component.next();
    expect(component.scrollStep()).toBe(880);
  });

  it('Should decrement scrollStep from previous().', () => {
    component.scrollStep.set(880);
    component.previous();
    expect(component.scrollStep()).toBe(176);
  });

  it('scrollStep should be less than 0 from previous().', () => {
    component.previous();
    expect(component.scrollStep()).toBe(0);
  });

  it('Should call to next() from onClick("next").', () => {
    jest.spyOn(component, 'next');
    component.onClick('next');
    expect(component.next).toHaveBeenCalled();
  });

  it('Should call to previous() from onClick("previous").', () => {
    jest.spyOn(component, 'previous');
    component.onClick('previous');
    expect(component.previous).toHaveBeenCalled();
  });
});
