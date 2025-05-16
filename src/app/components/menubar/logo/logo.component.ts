import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from 'src/app/environments/environment.developments';

@Component({
  selector: 'logo',
  imports: [ RouterLink ],
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  appName = environment.appName;
  slogan = environment.slogan;
}
