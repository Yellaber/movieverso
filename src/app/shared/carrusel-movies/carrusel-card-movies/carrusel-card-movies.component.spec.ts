import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CarruselCardMoviesComponent } from './carrusel-card-movies.component';
import { SlugifyService } from '@app/services';
import { environment } from '@environments/environment.developments';
import { mockMovies } from '@shared/mocks/mockMovies';

describe('CarruselCardMovies Component:', () => {
  let component: CarruselCardMoviesComponent;
  let fixture: ComponentFixture<CarruselCardMoviesComponent>;
  let slugifyService: SlugifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CarruselCardMoviesComponent ],
      providers: [ SlugifyService, provideRouter([]) ]
    }).compileComponents();
  });

  beforeEach(() => {
    slugifyService = TestBed.inject(SlugifyService);
    fixture = TestBed.createComponent(CarruselCardMoviesComponent);
    component = fixture.componentInstance;
  });

  it('Should create component.', () => {
    expect(component).toBeTruthy();
  });

  it('Should load the information movie correctly.', () => {
    fixture.componentRef.setInput('movie', mockMovies[0]);
    spyOn(slugifyService, 'getSlug');
    component.slugify(component.movie().title);
    expect(component.movie()).toEqual(mockMovies[0]);
    expect(component.srcImage()).toEqual(environment.imageUrl + component.movie().poster_path);
    expect(slugifyService.getSlug).toHaveBeenCalledWith(component.movie().title);
  });
});
