import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlagCdnService } from '@services/';
import { environment } from '@environments/environment.developments';

@Component({
  selector: 'logo',
  imports: [ RouterLink ],
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  flagcdnService = inject(FlagCdnService);
  countryFlag = input.required<string>();
  appName = environment.appName;
  slogan = environment.slogan;

  /*getFlagCountry() {
    return this.flagcdnService.getFlagCountry(this.countryCode(), '40');
  };*/
}
