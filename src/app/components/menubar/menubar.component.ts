import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SignInComponent } from './sign-in/sign-in.component';

@Component({
  selector: 'menubar',
  imports: [
    LogoComponent,
    NavigationComponent,
    SearchBarComponent,
    SignInComponent
  ],
  templateUrl: './menubar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenubarComponent { }
