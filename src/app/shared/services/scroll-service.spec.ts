import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll-service';
import { PlatformService } from './platform-service';
import { DOCUMENT } from '@angular/common';

describe('ScrollService.', () => {
  let scrollService: ScrollService;
  const platformServiceMock = { isBrowser: jest.fn() };
  const documentMock = {
    documentElement: { scrollTop: 0, clientHeight: 0, scrollHeight: 0, scrollTo: jest.fn() },
    querySelector: jest.fn().mockReturnValue({ classList: { add: jest.fn(), remove: jest.fn() } })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScrollService,
        { provide: PlatformService, useValue: platformServiceMock },
        { provide: DOCUMENT, useValue: documentMock }
      ],
    });
    scrollService = TestBed.inject(ScrollService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isAtBottom().', () => {
    it('Should return true when scroll is at the bottom.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      documentMock.documentElement.scrollTop = 500;
      documentMock.documentElement.clientHeight = 200;
      documentMock.documentElement.scrollHeight = 1000;
      expect(scrollService.isAtBottom()).toBe(true);
    });

    it('Should return false when scroll is not at the bottom.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      documentMock.documentElement.scrollTop = 500;
      documentMock.documentElement.clientHeight = 200;
      documentMock.documentElement.scrollHeight = 1000;
      expect(scrollService.isAtBottom(0)).toBe(false);
    });

    it('Should return false if not platform browser.', () => {
      platformServiceMock.isBrowser.mockReturnValue(false);
      expect(scrollService.isAtBottom(0)).toBe(false);
    });
  });

  describe('getScrollTop().', () => {
    it('Should return the current scroll position if platform browser exists.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      documentMock.documentElement.scrollTop = 350;
      expect(scrollService.getScrollTop()).toBe(350);
    });

    it('Should return 0 if not platform browser.', () => {
      platformServiceMock.isBrowser.mockReturnValue(false);
      expect(scrollService.getScrollTop()).toBe(0);
    });
  });

  describe('saveScrollPosition().', () => {
    it('Should save the current scroll position in the cache.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      documentMock.documentElement.scrollTop = 350;
      scrollService.saveScrollPosition('test-page');
      expect((scrollService as any).cacheScroll.get('test-page')).toBe(350);
    });

    it('Should save scroll position 0 in the cache if not in browser.', () => {
      platformServiceMock.isBrowser.mockReturnValue(false);
      scrollService.saveScrollPosition('no-browser');
      expect((scrollService as any).cacheScroll.get('no-browser')).toBe(0);
    });
  });

  describe('restoreScrollPosition().', () => {
    it('Should call setScrollTo if cache exists.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      documentMock.documentElement.scrollTop = 120;
      scrollService.saveScrollPosition('test-key');
      const setScrollToSpy = jest.spyOn(scrollService as any, 'setScrollTo');
      scrollService.restoreScrollPosition('test-key');
      expect(setScrollToSpy).toHaveBeenCalledWith(120, 'auto');
    });

    it('Should do nothing if not platform browser.', () => {
      platformServiceMock.isBrowser.mockReturnValue(false);
      const setScrollToSpy = jest.spyOn(scrollService as any, 'setScrollTo');
      scrollService.restoreScrollPosition('no-browser');
      expect(setScrollToSpy).not.toHaveBeenCalled();
    });

    it('Should not call setScrollTo if no cache.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      const setScrollToSpy = jest.spyOn(scrollService as any, 'setScrollTo');
      scrollService.restoreScrollPosition('non-existent-key');
      expect(setScrollToSpy).not.toHaveBeenCalled();
    });
  });

  describe('blockWindow().', () => {
    it('Should add "overflow-hidden" class to body if platform browser exists and isBlocked is true.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      scrollService.blockWindow(true);
      expect(documentMock.querySelector).toHaveBeenCalledWith('body');
      expect(documentMock.querySelector('body')?.classList.add).toHaveBeenCalledWith('overflow-hidden');
    });

    it('Should remove "overflow-hidden" class from body if platform browser exists and isBlocked is false.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      scrollService.blockWindow(false);
      expect(documentMock.querySelector).toHaveBeenCalledWith('body');
      expect(documentMock.querySelector('body')?.classList.remove).toHaveBeenCalledWith('overflow-hidden');
    });

    it('Should do nothing if not platform browser.', () => {
      platformServiceMock.isBrowser.mockReturnValue(false);
      expect(documentMock.querySelector).not.toHaveBeenCalledWith('body');
    });
  });

  it('scrollTop() should call setScrollTo() with top 0.', () => {
    platformServiceMock.isBrowser.mockReturnValue(true);
    const setScrollToSpy = jest.spyOn(scrollService as any, 'setScrollTo');
    scrollService.scrollTop();
    expect(setScrollToSpy).toHaveBeenCalledWith(0, 'auto');
  });
});
