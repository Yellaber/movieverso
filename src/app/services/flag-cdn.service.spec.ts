import { TestBed } from '@angular/core/testing';
import { FlagCdnService } from './flag-cdn.service';

describe('FlagCdn Service', () => {
  let flagCdnService: FlagCdnService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ FlagCdnService ]
    });
  });

  beforeEach(() => {
    flagCdnService = TestBed.inject(FlagCdnService);
  });

  it('getFlagCountry should return a valid url.', () => {
    const iso31661Code = 'CO';
    const sizeFlag = '20';
    const url = flagCdnService.getFlagCountry(iso31661Code, sizeFlag);
    expect(url).toBe(`https://flagcdn.com/w${sizeFlag}/${iso31661Code.toLowerCase()}.png`);
  });
});
