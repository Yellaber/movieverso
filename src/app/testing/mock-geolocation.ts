import { computed, signal } from '@angular/core';
import { of } from 'rxjs';
import { UserGeolocation } from '@shared/interfaces';

export const mockGeolocation: UserGeolocation = {
  ip: '1.2.3.4',
  location: {
    continent_code: 'SA',
    continent_name: 'South America',
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

export class MockUserGeolocationService {
  private userGeolocation = signal<UserGeolocation | undefined>(mockGeolocation);
  getUserGeolocation = computed(() => this.userGeolocation());
  loadUserLocation = jest.fn();
};

export class MockUserGeolocationServiceUndefined {
  private userGeolocation = signal<UserGeolocation | undefined>(undefined);
  getUserGeolocation = computed(() => this.userGeolocation());
  loadUserLocation = jest.fn();
};
