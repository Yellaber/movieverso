import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NavigationComponent } from '@shared/navigation/navigation.component';
import { SignInButtonComponent } from '@shared/auth/sign-in-button/sign-in-button.component';
import { ScrollableMenuComponent } from '@shared/scrollable-menu/scrollable-menu.component';

const menuItems = [ 'proximamente', 'estrenos', 'populares', 'valoradas', 'tendencia', 'listado' ];

@Component({
  selector: 'menubar',
  imports: [
    LogoComponent,
    NavigationComponent,
    ScrollableMenuComponent,
    SignInButtonComponent
  ],
  templateUrl: './menubar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenubarComponent {
  items = signal<string[]>(menuItems);
}
