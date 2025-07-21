import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FlagCdnService } from '@app/features/detail-movie/services/flag-cdn.service';
import { ProductionCountry } from '@shared/interfaces';

@Component({
  selector: 'production-countries',
  imports: [],
  templateUrl: './production-countries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3' }
})
export class ProductionCountriesComponent {
  private flagcdnService = inject(FlagCdnService);
  productionCountries = input.required<ProductionCountry[]>();

  getFlagCountry(iso31661Code: string): string {
    return this.flagcdnService.getFlagCountry(iso31661Code, '80');
  };
}
