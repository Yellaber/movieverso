import { Injectable } from '@angular/core';

type TypeSizeFlag = '20' | '40' | '80';

@Injectable({
  providedIn: 'root'
})
export class FlagCdnService {
  getFlagCountry(iso31661Code: string, sizeFlag: TypeSizeFlag) {
    return `https://flagcdn.com/w${sizeFlag}/${iso31661Code.toLowerCase()}.png`;
  };
}
