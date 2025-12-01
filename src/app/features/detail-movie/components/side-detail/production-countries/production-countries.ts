import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FlagCdnUtils } from '@utils';
import { ProductionCountry } from '@interfaces';

@Component({
  selector: 'production-countries',
  imports: [ TranslatePipe ],
  templateUrl: './production-countries.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3' }
})
export class ProductionCountries {
  private readonly FLAG_SIZE = '80';
  productionCountries = input.required<ProductionCountry[]>();

  getFlagCountry(iso31661Code: string): string {
    return FlagCdnUtils.getFlagCountry(iso31661Code, this.FLAG_SIZE);
  }
}
