import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@environments/environment';
import { TranslatePipe } from "@ngx-translate/core";

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
