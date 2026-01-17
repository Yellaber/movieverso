import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FlagCdnUtils } from '@utils';
import { FlagCountry, ProductionCountry } from '@interfaces';

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
  getFlagCountries = computed<FlagCountry[]>(() =>
    this.productionCountries()? this.productionCountries().map(country => this.getFlagCountry(country)): []
  );

  private getFlagCountry(productionCountry: ProductionCountry): FlagCountry {
    return ({
      flag: FlagCdnUtils.getFlagCountry(productionCountry.iso_3166_1, this.FLAG_SIZE),
      name: productionCountry.name
    })
  }
}
