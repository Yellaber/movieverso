import { FlagCdnUtils } from '../utils/flag-cdn-utils';

type TypeSizeFlag = '20' | '40' | '80';

describe('FlagCdnUtils.', () => {
  let iso31661Code: string;
  let sizeFlag: TypeSizeFlag;

  beforeEach(() => {
    iso31661Code = 'CO';
    sizeFlag = '40';
  })

  it('Should return a valid url.', () => {
    const url = FlagCdnUtils.getFlagCountry(iso31661Code, sizeFlag);
    expect(url).toBe(`https://flagcdn.com/w${sizeFlag}/${iso31661Code.toLowerCase()}.png`);
  })

  it('Should return a valid url with different size.', () => {
    sizeFlag = '80';
    const url = FlagCdnUtils.getFlagCountry(iso31661Code, sizeFlag);
    expect(url).toBe(`https://flagcdn.com/w${sizeFlag}/${iso31661Code.toLowerCase()}.png`);
  })

  it('Should return a valid url with different country code.', () => {
    iso31661Code = 'US';
    const url = FlagCdnUtils.getFlagCountry(iso31661Code, sizeFlag);
    expect(url).toBe(`https://flagcdn.com/w${sizeFlag}/${iso31661Code.toLowerCase()}.png`);
  })

  it('Should return a valid url with lowercase country code.', () => {
    iso31661Code = 'br';
    const url = FlagCdnUtils.getFlagCountry(iso31661Code, sizeFlag);
    expect(url).toBe(`https://flagcdn.com/w${sizeFlag}/${iso31661Code.toLowerCase()}.png`);
  })

  it('Should return a valid url with mixed case country code.', () => {
    iso31661Code = 'eS';
    const url = FlagCdnUtils.getFlagCountry(iso31661Code, sizeFlag);
    expect(url).toBe(`https://flagcdn.com/w${sizeFlag}/${iso31661Code.toLowerCase()}.png`);
  })

  it('Should return a valid url with empty country code.', () => {
    iso31661Code = '';
    const url = FlagCdnUtils.getFlagCountry(iso31661Code, sizeFlag);
    expect(url).toBe(`https://flagcdn.com/w${sizeFlag}/${iso31661Code.toLowerCase()}.png`);
  })
})
