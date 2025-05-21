import { TestBed } from '@angular/core/testing';
import { RoutesService } from './routes.service';
import { Route } from '@angular/router';

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

describe('Routes Service:', () => {
  let routesService: RoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ RoutesService ]
    });
  });

  beforeEach(() => {
    routesService = TestBed.inject(RoutesService);
  });

  it('Should create service.', () => {
    expect(routesService).toBeTruthy();
  });

  it('Should return an empty routes array.', () => {
    const routes = routesService.getRoutes();
    expect(routes).toEqual([]);
  });

  it('Should update the routes array.', () => {
    routesService.setRoutes(mockRoutes);
    const routes = routesService.getRoutes();
    expect(routes).toEqual(mockRoutes);
  });
});
