import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import * as ngCommon from '@angular/common';
import { of } from 'rxjs';
import { UserGeolocationService } from './user-geolocation.service';
import { UserGeolocation } from '@shared/interfaces';

jest.mock('@angular/common', () => ({
  ...jest.requireActual('@angular/common'),
  isPlatformBrowser: jest.fn(),
}));

const mockGeo: UserGeolocation = {
  ip: '1.2.3.4',
  location: {
    continent_code: 'NA',
    continent_name: 'North America',
    country_code2: 'US',
    country_code3: 'USA',
    country_name: 'United States',
    country_name_official: 'United States of America',
    country_capital: 'Washington D.C.',
    state_prov: 'California',
    state_code: 'CA',
    district: 'Los Angeles',
    city: 'Los Angeles',
    zipcode: '90001',
    latitude: '34.0522',
    longitude: '-118.2437',
    is_eu: false,
    country_flag: '🇺🇸',
    geoname_id: '123456',
    country_emoji: '🇺🇸'
  },
  country_metadata: {
    calling_code: '+1',
    tld: '.us',
    languages: ['en_US']
  },
  currency: {
    code: 'USD',
    name: 'United States Dollar',
    symbol: '$'
  }
};

describe('UserGeolocationService', () => {
  let service: UserGeolocationService;
  let httpClient: { get: jest.Mock };

  beforeEach(() => {
    (ngCommon.isPlatformBrowser as jest.Mock).mockReturnValue(true);

    const httpSpy = { get: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        UserGeolocationService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    service = TestBed.inject(UserGeolocationService);
    httpClient = TestBed.inject(HttpClient) as any;
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Should be created.', () => {
    expect(service).toBeTruthy();
  });

  it('Should return undefined if not platform browser.', (done) => {
    (ngCommon.isPlatformBrowser as jest.Mock).mockReturnValue(false);
    service.loadUserLocation('http://api').subscribe(result => {
      expect(result).toBeUndefined();
      done();
    });
  });

  it('Should return geolocation from localStorage if present.', (done) => {
    localStorage.setItem('userLocalLocation', JSON.stringify(mockGeo));
    service.loadUserLocation('http://api').subscribe(result => {
      expect(result).toEqual(mockGeo);
      done();
    });
  });

  it('Should fetch geolocation from API if not in localStorage.', (done) => {
    httpClient.get.mockReturnValue(of(mockGeo));
    service.loadUserLocation('http://api').subscribe(result => {
      expect(httpClient.get).toHaveBeenCalledWith('http://api?apiKey=65139d689b9a48b2b125c9365c130b1f');
      expect(result).toEqual(mockGeo);
      expect(JSON.parse(localStorage.getItem('userLocalLocation')!)).toEqual(mockGeo);
      done();
    });
  });

  it('getUserLanguage should return [language] if includes "es".', () => {
    expect(service['getUserLanguage']('es_MX')).toEqual(['es_MX']);
  });

  it('getUserLanguage should return ["en_US"] if not includes "es".', () => {
    expect(service['getUserLanguage']('fr_FR')).toEqual(['en_US']);
  });

  it('getUserGeolocation should return cached value.', () => {
    (service as any).userGeolocation = mockGeo;
    expect(service.getUserGeolocation()).toEqual(mockGeo);
  });
});
