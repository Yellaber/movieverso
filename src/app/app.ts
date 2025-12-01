import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './layout/components/app-header/app-header';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  imports: [ AppHeader, RouterOutlet ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  title = environment.appName;
}
