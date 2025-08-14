import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RoutesService } from './routes.service';

const mockRoutes: Route[] = [
  { path: 'home', title: 'Home' }, { path: 'upcoming', title: 'Upcoming' },
  { path: 'popular', title: 'Popular' }, { path: 'top-rated', title: 'Top Rated' },
  { path: 'now-playing', title: 'Now Playing' }, { path: 'trending', title: 'Trending' }
];

const updatedMockRoutes: Route[] = [{ path: 'contact', title: 'Contact' }];

describe('RoutesService', () => {
  let service: RoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutesService]
    });
    service = TestBed.inject(RoutesService);
  });

  it('Should be created.', () => {
    expect(service).toBeTruthy();
  });

  it('Should have an initial empty array of routes.', () => {
    expect(service.getRoutes()).toEqual([]);
  });

  it('Should set routes correctly.', () => {
    service.setRoutes(mockRoutes);
    expect(service.getRoutes()).toEqual(mockRoutes);
  });

  it('Should update routes when setRoutes is called again.', () => {
    service.setRoutes(mockRoutes);
    expect(service.getRoutes()).toEqual(mockRoutes);
    service.setRoutes(updatedMockRoutes);
    expect(service.getRoutes()).toEqual(updatedMockRoutes);
  });

  it('Should return a readonly signal.', () => {
    const readonlySignal = service.getRoutes;
    expect((readonlySignal as any).set).toBeUndefined();
    expect((readonlySignal as any).update).toBeUndefined();
    expect((readonlySignal as any).mutate).toBeUndefined();
  });
});
