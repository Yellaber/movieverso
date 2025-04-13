import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductionCountry } from './../../../interfaces/detail-movie-response.interface';

const flagCdnUrl = 'https://flagcdn.com/w80/';

@Component({
  selector: 'production-countries',
  imports: [],
  templateUrl: './production-countries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3' }
})
export class ProductionCountriesComponent {
  productionCountries = input.required<ProductionCountry[]>();

  getFlagCountry(iso31661Code: string): string {
    return flagCdnUrl + iso31661Code.toLowerCase() + '.png';
  }
}
