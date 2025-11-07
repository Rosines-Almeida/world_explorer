import { map } from 'rxjs';
export interface CountryModel {
  name: { common: string };
  flags: { png: string; svg: string };
  cca3: string;
  region?: string;
  capital?: string[];
  timezones?: Array<string>; 
}

export interface CountryDetailModel extends CountryModel {
  subregion?: string;
  languages?: { [key: string]: string };
  currencies?: CurrenciesModel;
  borders?: string[];
  tld?: string[];
  latlng?: number[];
  population: number;
  area?: number;
  continents?: string[];
  flag?: Array<FlagsModel>;
  maps?: MapModel;
}

export interface MapModel {
  googleMaps: string;
  openStreetMaps: string;
}

export interface CurrenciesModel {
  [key: string]: {
    name: string;
    symbol: string;
  };
}
export interface FlagsModel {
  alt?: string;
  png: string;
  svg: string;
}

