import { TestBed } from '@angular/core/testing';
import { ActiveActionService } from './active-action.service';

describe('ActiveActionService', () => {
  let service: ActiveActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveActionService]
    });
    service = TestBed.inject(ActiveActionService);
  });

  it('Should be created.', () => {
    expect(service).toBeTruthy();
  });

  it('Should have an initial value of undefined.', () => {
    expect(service.get()()).toBeUndefined();
  });

  it('Should set the action to "search".', () => {
    service.set('search');
    expect(service.get()()).toBe('search');
  });

  it('Should set the action to "filter".', () => {
    service.set('filter');
    expect(service.get()()).toBe('filter');
  });

  it('Should update the action from "search" to "filter".', () => {
    service.set('search');
    expect(service.get()()).toBe('search');

    service.set('filter');
    expect(service.get()()).toBe('filter');
  });

  it('Should return a readonly signal.', () => {
    const readonlySignal = service.get();
    expect((readonlySignal as any).set).toBeUndefined();
    expect((readonlySignal as any).update).toBeUndefined();
  });
});
