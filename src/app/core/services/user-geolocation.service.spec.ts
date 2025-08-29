import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { UserGeolocationService } from './user-geolocation.service';
import { PlatformService } from '@shared/services';
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
    mockLocalStorage.clear();
  });

  it('Should add languages and set fallback language.', () => {
    const addLangsSpy = jest.spyOn(geolocationService['translateService'], 'addLangs');
    const setFallbackLangSpy = jest.spyOn(geolocationService['translateService'], 'setFallbackLang');
    const loadUserLocationSpy = jest.spyOn(geolocationService as any, 'loadUserLocation');
    geolocationService['loadUserLocation']();
    expect(addLangsSpy).toHaveBeenCalledWith(['es', 'en']);
    expect(setFallbackLangSpy).toHaveBeenCalledWith('en');
    expect(loadUserLocationSpy).toHaveBeenCalled();
  });

  describe('loadUserLocation().', () => {
    it('Should return undefined if not platform browser.', () => {
      mockPlatformService.isBrowser.mockReturnValue(false);
      geolocationService['loadUserLocation']();
      expect(geolocationService['getUserGeolocation']()).toBeUndefined();
    });

    it('Should use localStorage if it has a value.', () => {
      mockPlatformService.isBrowser.mockReturnValue(true);
      localStorage.setItem('userLocalLocation', JSON.stringify(mockGeolocation));
      const getItemSpy = jest.spyOn(localStorage, 'getItem');
      const useSpy = jest.spyOn(geolocationService['translateService'], 'use');
      geolocationService['loadUserLocation']();
      expect(getItemSpy).toHaveBeenCalledWith('userLocalLocation');
      expect(useSpy).toHaveBeenCalledWith('es');
      expect(geolocationService['getUserGeolocation']()).toEqual(mockGeolocation);
    });

    it('Should fetch geolocation from API if localStorage is not present.', () => {
      mockPlatformService.isBrowser.mockReturnValue(true);
      const getUserLanguageSpy = jest.spyOn(geolocationService as any, 'getUserLanguage');
      const useSpy = jest.spyOn(geolocationService['translateService'], 'use');
      const request = httpClientMock.expectOne(`${environment.ipGeolocationApiUrl}?apiKey=${environment.ipGeolocationApiKey}`);
      request.flush(mockGeolocation);
      expect(getUserLanguageSpy).toHaveBeenCalledWith(mockGeolocation.country_metadata.languages[0]);
      expect(useSpy).toHaveBeenCalledWith('es');
      expect(geolocationService['getUserGeolocation']()).toEqual(mockGeolocation);
      httpClientMock.verify();
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
