import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { PlatformService } from './platform-service';

describe('PlatformService.', () => {
  let platformService: PlatformService;

  describe('If platform is browser.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          PlatformService,
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      platformService = TestBed.inject(PlatformService);
    });

    it('isBrowser() should return true.', () => {
      expect(platformService.isBrowser()).toBe(true);
    })
  })

  describe('If platform is server.', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          PlatformService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      platformService = TestBed.inject(PlatformService);
    })

    it('isBrowser() should return false.', () => {
      expect(platformService.isBrowser()).toBe(false);
    })
  })

  it('isBrowser() result should be consistent across multiple calls.', () => {
    TestBed.configureTestingModule({
      providers: [
        PlatformService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    platformService = TestBed.inject(PlatformService);
    expect(platformService.isBrowser()).toBe(true);
    expect(platformService.isBrowser()).toBe(true); // mismo resultado cacheado
  })
})
