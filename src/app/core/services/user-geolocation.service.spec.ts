import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { UserGeolocationService } from './user-geolocation.service';
import { PlatformService } from '@shared/services';
import { UserGeolocation } from '@shared/interfaces';
import { environment } from '@app/environments/environment.developments';

const mockGeolocation: UserGeolocation = {
  ip: '1.2.3.4',
  location: {
    continent_code: 'SA',
    continent_name: 'Sounth America',
    country_code2: 'CO',
    country_code3: 'COL',
    country_name: 'Colombia',
    country_name_official: 'Republic of Colombia',
    country_capital: 'Bogota',
    state_prov: 'Bolivar',
    state_code: 'CO-BOL',
    district: 'Cartagena Province',
    city: 'Cartagena',
    zipcode: '130008',
    latitude: '10.48366',
    longitude: '-75.45778',
    is_eu: false,
    country_flag: 'https://ipgeolocation.io/static/flags/co_64.png',
    geoname_id: '3830557',
    country_emoji: 'co'
  },
  country_metadata: {
    calling_code: '+57',
    tld: '.co',
    languages: ['es-CO']
  },
  currency: {
    code: 'COP',
    name: 'Colombian Peso',
    symbol: '$'
  }
};

describe('UserGeolocationService', () => {
  let geolocationService: UserGeolocationService;
  let httpClientMock: HttpTestingController;
  const translateServiceMock = {
    addLangs: jest.fn(),
    setFallbackLang: jest.fn(),
    use: jest.fn()
  };
  const platformServiceMock = { isBrowser: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserGeolocationService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: PlatformService, useValue: platformServiceMock }
      ]
    });

    geolocationService = TestBed.inject(UserGeolocationService);
    httpClientMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    httpClientMock.verify();
    localStorage.clear();
  });

  it('Should be created.', () => {
    expect(geolocationService).toBeTruthy();
    expect(translateServiceMock.addLangs).toHaveBeenCalledWith(['es', 'en']);
    expect(translateServiceMock.setFallbackLang).toHaveBeenCalledWith('en');
  });

  describe('loadUserLocation().', () => {
    it('Should return undefined if not platform browser.', () => {
      platformServiceMock.isBrowser.mockReturnValue(false);
      geolocationService.loadUserLocation('http://api').subscribe(result => {
        expect(result).toBeUndefined();
      });
    });

    it('Should return geolocation if localStorage is present.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      localStorage.setItem('userLocalLocation', JSON.stringify(mockGeolocation));
      let userLocation: UserGeolocation | undefined;
      geolocationService.loadUserLocation('http://api').subscribe(response => {
        userLocation = response;
      });
      expect(userLocation).toEqual(mockGeolocation);
    });

    it('Should fetch geolocation from API if localStorage in not present.', () => {
      platformServiceMock.isBrowser.mockReturnValue(true);
      const getLocationSpy = jest.spyOn(geolocationService as any, 'getLocation');
      let userLocation: UserGeolocation | undefined;
      geolocationService.loadUserLocation('http://api').subscribe(response => {
        userLocation = response;
      });
      const request = httpClientMock.expectOne(`http://api?apiKey=${environment.ipGeolocationApiKey}`);
      request.flush(mockGeolocation);
      expect(getLocationSpy).toHaveBeenCalledWith('http://api');
      expect(userLocation).toEqual(mockGeolocation);
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

  it('getUserGeolocation() should return cached value.', () => {
    (geolocationService as any).userGeolocation = mockGeolocation;
    expect(geolocationService.getUserGeolocation()).toEqual(mockGeolocation);
  });
});
