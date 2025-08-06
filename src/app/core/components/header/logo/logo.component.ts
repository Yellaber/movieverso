import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { environment } from '@environments/environment.developments';

@Component({
  selector: 'logo',
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  countryFlag = input.required<string | undefined>();
  appName = environment.appName;
}
