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
  countryFlag = input.required<string | undefined>();
  appName = environment.appName;
  slogan = environment.slogan;
}
