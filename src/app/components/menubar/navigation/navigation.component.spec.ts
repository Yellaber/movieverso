import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Route, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { RoutesService } from '@app/services/routes.service';

const mockRoutes: Route[] = [
  { title: 'Inicio', path: '' }, { title: 'Próximamente', path: 'proximamente' },
  { title: 'Película', path: 'pelicula/:id-slug' }, { title: 'Estrenos', path: 'estrenos' },
  { title: 'Populares', path: 'populares' }, { title: 'Más valoradas', path: 'valoradas' },
  { title: 'En tendencia', path: 'tendencia' }, { title: 'Listado', path: 'listado' },
  { title: 'Buscar', path: 'buscar' }, { title: 'Iniciar sesión', path: 'auth/iniciar-sesion' },
  { title: 'Registro', path: 'auth/registro' },
  { title: 'Política de privacidad', path: 'politica-de-privacidad' },
  { title: 'Términos y condiciones', path: 'terminos-y-condiciones' }
];

const routesToShow = [ 'proximamente', 'estrenos', 'populares', 'valoradas', 'tendencia', 'listado' ];

describe('Navigation Component:', () => {
  let routesService: RoutesService;
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NavigationComponent, RouterLink, RouterLinkActive ],
      providers: [ RoutesService, provideRouter([]) ]
    }).compileComponents();
  });

  beforeEach(() => {
    routesService = TestBed.inject(RoutesService);
    routesService.setRoutes(mockRoutes);
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('layoutClass', 'hidden lg:flex lg:items-center lg:gap-5');
  });

  it('Should create component.', () => {
    fixture.componentRef.setInput('menuItems', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should contain the 0 routes to show in main menu.', () => {
    fixture.componentRef.setInput('menuItems', []);
    fixture.detectChanges();
    expect(component.mainRoutes().length).toBe(0);
  });

  it('Should contain the 6 routes to show in main menu.', () => {
    fixture.componentRef.setInput('menuItems', routesToShow);
    fixture.detectChanges();
    expect(component.mainRoutes().length).toBe(routesToShow.length);
  });
});
