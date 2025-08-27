import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { UserGeolocationService } from './user-geolocation.service';
import { PlatformService } from '@shared/services';
import { UserGeolocation } from '@shared/interfaces';
import { environment } from '@app/environments/environment.developments';
import { mockGeolocation, mockLocalStorage, mockPlatformService, MockTranslateService } from '@app/testing';

describe('UserGeolocationService', () => {
  let geolocationService: UserGeolocationService;
  let httpClientMock: HttpTestingController;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    TestBed.configureTestingModule({
      providers: [
        UserGeolocationService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: PlatformService, useValue: mockPlatformService }
      ]
    });

    geolocationService = TestBed.inject(UserGeolocationService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    httpClientMock.verify();
    mockLocalStorage.clear();
  });

  it('Should be created.', () => {
    const addLangsSpy = jest.spyOn(geolocationService['translateService'], 'addLangs');
    const setFallbackLangSpy = jest.spyOn(geolocationService['translateService'], 'setFallbackLang');
    expect(geolocationService).toBeTruthy();
    expect(addLangsSpy).toHaveBeenCalledWith(['es', 'en']);
    expect(setFallbackLangSpy).toHaveBeenCalledWith('en');
  });

  describe('loadUserLocation().', () => {
    it('Should return undefined if not platform browser.', () => {
      mockPlatformService.isBrowser.mockReturnValue(false);
      geolocationService.loadUserLocation('http://api').subscribe(result => {
        expect(result).toBeUndefined();
      });
    });

    it('Should return geolocation if localStorage is present.', () => {
      mockPlatformService.isBrowser.mockReturnValue(true);
      localStorage.setItem('userLocalLocation', JSON.stringify(mockGeolocation));
      const useSpy = jest.spyOn(geolocationService['translateService'], 'use');
      let userLocation: UserGeolocation | undefined;

      geolocationService.loadUserLocation('http://api').subscribe(response => {
        userLocation = response;
      });

      expect(localStorage.getItem).toHaveBeenCalledWith('userLocalLocation');
      expect(userLocation).toEqual(mockGeolocation);
      expect(useSpy).toHaveBeenCalledWith('es');
    });

    it('Should fetch geolocation from API if localStorage is not present.', () => {
      mockPlatformService.isBrowser.mockReturnValue(true);
      const getLocationSpy = jest.spyOn(geolocationService as any, 'getLocation');
      const setItemSpy = jest.spyOn(localStorage, 'setItem');
      const useSpy = jest.spyOn(geolocationService['translateService'], 'use');
      let userLocation: UserGeolocation | undefined;

      geolocationService.loadUserLocation('http://api').subscribe(response => {
        userLocation = response;
      });

      const request = httpClientMock.expectOne(`http://api?apiKey=${environment.ipGeolocationApiKey}`);
      request.flush(mockGeolocation);
      expect(getLocationSpy).toHaveBeenCalledWith('http://api');
      expect(userLocation).toEqual(mockGeolocation);
      expect(setItemSpy).toHaveBeenCalledWith('userLocalLocation', JSON.stringify(mockGeolocation));
      expect(useSpy).toHaveBeenCalledWith('es');
    });
  });

  describe('getUserLanguage().', () => {
    it('Should return ["es-MX"] if includes "es".', () => {
      expect(geolocationService['getUserLanguage']('es-MX')).toEqual(['es-MX']);
    });

    it('Should return ["en-US"] if not includes "es".', () => {
      expect(geolocationService['getUserLanguage']('fr-FR')).toEqual(['en-US']);
    });
  });
});
