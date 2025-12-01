export interface MovieWatchProvider {
  id: number;
  country: Country;
}

export interface Country {
  AD: Ad;
  AE: Ad;
  AO: Ao;
  AR: Ao;
  AT: Ao;
  AU: Ao;
  AZ: Ao;
  BA: Ad;
  BE: Ao;
  BF: Ao;
  BG: Ao;
  BH: Ad;
  BO: Ao;
  BR: Ao;
  BY: Ao;
  BZ: Ao;
  CA: Ao;
  CH: Ao;
  CI: Ad;
  CL: Ao;
  CM: Ad;
  CO: Ao;
  CR: Ao;
  CV: Ao;
  CY: Ao;
  CZ: Ao;
  DE: Ao;
  DK: Ao;
  DO: Ad;
  DZ: Ad;
  EC: Ao;
  EE: Ao;
  EG: Ao;
  ES: Ao;
  FI: Ao;
  FR: Ao;
  GB: Ao;
  GF: Ad;
  GH: Ao;
  GQ: Ad;
  GR: Ao;
  GT: Ao;
  HK: Ao;
  HN: Ao;
  HR: Ao;
  HU: Ao;
  ID: Ao;
  IE: Ao;
  IL: Ao;
  IN: Ao;
  IQ: Ad;
  IS: Ao;
  IT: Ao;
  JO: Ad;
  JP: Ao;
  KE: Ad;
  KR: Ao;
  KW: Ad;
  LB: Ad;
  LT: Ao;
  LU: Ao;
  LV: Ao;
  LY: Ad;
  MA: Ad;
  MC: Ad;
  MG: Ad;
  MK: Ad;
  ML: Ao;
  MU: Ao;
  MX: Ao;
  MY: Ao;
  MZ: Ao;
  NE: Ad;
  NG: Ad;
  NI: Ao;
  NL: Ao;
  NO: Ao;
  NZ: Ao;
  OM: Ad;
  PA: Ad;
  PE: Ao;
  PF: Ad;
  PG: Ao;
  PH: Ao;
  PL: Ao;
  PS: Ad;
  PT: Ao;
  PY: Ao;
  QA: Ad;
  RO: Ao;
  RS: Ad;
  RU: Ao;
  SA: Ao;
  SC: Ad;
  SE: Ao;
  SG: Ao;
  SI: Ao;
  SK: Ao;
  SN: Ad;
  SV: Ad;
  TD: Ad;
  TH: Ao;
  TN: Ad;
  TR: Ao;
  TW: Ao;
  TZ: Ao;
  UA: Ao;
  UG: Ao;
  US: Ao;
  UY: Ad;
  VE: Ao;
  YE: Ad;
  ZA: Ao;
  ZM: Ad;
  ZW: Ao;
}

export interface Flatrate {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface Ad {
  link: string;
  flatrate: Flatrate[];
}

export interface Ao {
  link: string;
  flatrate?: Flatrate[];
  buy: Flatrate[];
  rent: Flatrate[];
  ads?: Flatrate[];
}
