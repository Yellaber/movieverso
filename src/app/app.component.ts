import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from "./components/menubar/menubar.component";
import { FooterSiteComponent } from "./components/footer-site/footer-site.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenubarComponent,
    FooterSiteComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'MovieVerso';
}
