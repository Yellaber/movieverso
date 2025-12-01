import { TestBed } from '@angular/core/testing';
import { RoutesService } from './routes-service';
import { mockRoutes, mockUpdateRoutes } from '@app/shared/mocks';

describe('RoutesService.', () => {
  let service: RoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ RoutesService ]
    });
    service = TestBed.inject(RoutesService);
  })

  it('Should be created.', () => {
    expect(service).toBeTruthy();
  })

  it('Should have one or more routes.', () => {
    expect(service.getRoutes().length).toBeGreaterThanOrEqual(1);
  })

  it('Should set routes correctly.', () => {
    service.setRoutes(mockRoutes);
    expect(service.getRoutes()).toEqual(mockRoutes);
  })

  it('Should update routes when setRoutes is called again.', () => {
    service.setRoutes(mockRoutes);
    expect(service.getRoutes()).toEqual(mockRoutes);
    service.setRoutes(mockUpdateRoutes);
    expect(service.getRoutes()).toEqual(mockUpdateRoutes);
  })

  it('Should return a readonly signal.', () => {
    const readonlySignal = service.getRoutes;
    expect((readonlySignal as any).set).toBeUndefined();
    expect((readonlySignal as any).update).toBeUndefined();
    expect((readonlySignal as any).mutate).toBeUndefined();
  })
})
