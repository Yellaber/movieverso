import { Injectable } from '@angular/core';

type typeSizes = '20' | '40' | '80';

@Injectable({
  providedIn: 'root'
})
export class FlagCdnService {
  private flagCdnUrl = 'https://flagcdn.com/w';

  getFlagCountry(iso31661Code: string, size: typeSizes): string {
    return this.flagCdnUrl.concat(size) + '/' + iso31661Code.toLowerCase() + '.png';
  };
}
