import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FlagCdnService } from '@app/features/detail-movie/services/flag-cdn.service';
import { ProductionCountry } from '@shared/interfaces';

@Component({
  selector: 'production-countries',
  imports: [ TranslatePipe ],
  templateUrl: './production-countries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-3' }
})
export class ProductionCountriesComponent {
  private flagcdnService = inject(FlagCdnService);
  private readonly FLAG_SIZE = '80';
  productionCountries = input.required<ProductionCountry[]>();

  getFlagCountry(iso31661Code: string): string {
    return this.flagcdnService.getFlagCountry(iso31661Code, this.FLAG_SIZE);
  };
}
