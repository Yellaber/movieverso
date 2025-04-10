import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'footer-site',
  imports: [ RouterLink ],
  templateUrl: './footer-site.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterSiteComponent { }
