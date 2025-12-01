type TypeSizeFlag = '20' | '40' | '80';

export class FlagCdnUtils {
  static getFlagCountry(iso31661Code: string, sizeFlag: TypeSizeFlag) {
    return `https://flagcdn.com/w${sizeFlag}/${iso31661Code.toLowerCase()}.png`;
  };
}
