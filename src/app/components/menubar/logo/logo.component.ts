import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.developments';

@Component({
  selector: 'logo',
  imports: [ RouterLink ],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  appNamePre = environment.appNamePre;
  appNamePost = environment.appNamePost;
  slogan = environment.slogan;
}
