import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './core/components/header/app-header.component';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  imports: [
    AppHeaderComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = environment.appName;
};
