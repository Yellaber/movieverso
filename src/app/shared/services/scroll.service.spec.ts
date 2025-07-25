import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;
  let document: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScrollService,
        {
          provide: DOCUMENT,
          useValue: {
            documentElement: {
              scrollTop: 0,
              clientHeight: 0,
              scrollHeight: 0,
              scrollTo: jest.fn(),
            },
            querySelector: jest.fn().mockReturnValue({
              classList: {
                add: jest.fn(),
                remove: jest.fn(),
              },
            }),
          },
        },
      ],
    });
    service = TestBed.inject(ScrollService);
    document = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be created.', () => {
    expect(service).toBeTruthy();
  });

  it('isAtBottom should return true when scroll is at the bottom.', () => {
    document.documentElement.scrollTop = 800;
    document.documentElement.clientHeight = 200;
    document.documentElement.scrollHeight = 1000;
    expect(service.isAtBottom(0)).toBe(true);
  });

  it('isAtBottom should return false when scroll is not at the bottom.', () => {
    document.documentElement.scrollTop = 500;
    document.documentElement.clientHeight = 200;
    document.documentElement.scrollHeight = 1000;
    expect(service.isAtBottom(0)).toBe(false);
  });

  it('setScrollTo should call documentElement.scrollTo with correct parameters.', () => {
    service.setScrollTo(500, 'smooth');
    expect(document.documentElement.scrollTo).toHaveBeenCalledWith({ top: 500, behavior: 'smooth' });
  });

  it('scrollTop should call setScrollTo with top 0.', () => {
    const setScrollToSpy = jest.spyOn(service, 'setScrollTo');
    service.scrollTop('smooth');
    expect(setScrollToSpy).toHaveBeenCalledWith(0, 'smooth');
  });

  it('saveScrollPosition and restoreScrollPosition should save the current scroll position and restore it later.', () => {
    document.documentElement.scrollTop = 450;
    service.saveScrollPosition('test-page');

    const setScrollToSpy = jest.spyOn(service, 'setScrollTo');
    service.restoreScrollPosition('test-page', 'auto');

    expect(setScrollToSpy).toHaveBeenCalledWith(450, 'auto');
  });

  it('blockWindow should add "overflow-hidden" class to body when isBlocked is true.', () => {
    service.blockWindow(true);
    expect(document.querySelector).toHaveBeenCalledWith('body');
    expect(document.querySelector('body')?.classList.add).toHaveBeenCalledWith('overflow-hidden');
  });

  it('blockWindow should remove "overflow-hidden" class from body when isBlocked is false.', () => {
    service.blockWindow(false);
    expect(document.querySelector).toHaveBeenCalledWith('body');
    expect(document.querySelector('body')?.classList.remove).toHaveBeenCalledWith('overflow-hidden');
  });
});
