import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { PlatformService } from './platform.service';

describe('PlatformService.', () => {
  let platformService: PlatformService;

  describe('If document is in the browser.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ PlatformService, { provide: DOCUMENT, useValue: {} as Document } ]
      });

      platformService = TestBed.inject(PlatformService);
      (globalThis as any).window = {};
    });

    it('isBrowser() should return true.', () => {
      expect(platformService.isBrowser()).toBe(true);
    });
  });

  describe('If document is not in the browser.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ PlatformService, { provide: DOCUMENT, useValue: {} } ]
      });

      platformService = TestBed.inject(PlatformService);
      delete (globalThis as any).window;
    });

    it('isBrowser() should return false.', () => {
      expect(platformService.isBrowser()).toBe(false);
    });
  });

  describe('If document is null (server environment).', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ PlatformService, { provide: DOCUMENT, useValue: {} } ]
      });

      platformService = TestBed.inject(PlatformService);
    });

    it('isBrowser() should return false.', () => {
      expect(platformService.isBrowser()).toBe(false);
    });
  });
});
