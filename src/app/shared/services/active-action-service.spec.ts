import { TestBed } from '@angular/core/testing';
import { ActiveActionService } from './active-action-service';

describe('ActiveActionService', () => {
  let service: ActiveActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveActionService]
    });
    service = TestBed.inject(ActiveActionService);
  })

  it('Should be created.', () => {
    expect(service).toBeTruthy();
  })

  it('Should have "none" as initial value.', () => {
    expect(service.getActiveAction()).toBe('none');
  })

  it('Should set the action to "search".', () => {
    service.set('search');
    expect(service.getActiveAction()).toBe('search');
  })

  it('Should set the action to "filter".', () => {
    service.set('filter');
    expect(service.getActiveAction()).toBe('filter');
  })

  it('Should update the action from "search" to "filter".', () => {
    service.set('search');
    expect(service.getActiveAction()).toBe('search');
    service.set('filter');
    expect(service.getActiveAction()).toBe('filter');
  })

  it('Should set the action to "none".', () => {
    service.set('none');
    expect(service.getActiveAction()).toBe('none');
  })

  it('Should return a readonly signal.', () => {
    const readonlySignal = service.getActiveAction;
    expect((readonlySignal as any).set).toBeUndefined();
    expect((readonlySignal as any).update).toBeUndefined();
    expect((readonlySignal as any).mutate).toBeUndefined();
  })
})
