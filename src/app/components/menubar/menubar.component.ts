import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { NavigationBarComponent } from '../../shared/navigation-bar/navigation-bar.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { SignInComponent } from './sign-in/sign-in.component';

@Component({
  selector: 'menubar',
  imports: [
    LogoComponent,
    NavigationBarComponent,
    SearchBarComponent,
    SignInComponent
],
  templateUrl: './menubar.component.html',
})
export class MenubarComponent { }
