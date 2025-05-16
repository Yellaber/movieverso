import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenubarComponent } from '@components/menubar/menubar.component';
import { FooterSiteComponent } from '@components/footer-site/footer-site.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    MenubarComponent,
    FooterSiteComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'MovieVerso';
}
