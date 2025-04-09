import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire, faStar, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tag',
  imports: [ FontAwesomeModule ],
  templateUrl: './tag.component.html'
})
export class TagComponent {
  text = input.required<string>();
  type = input<string>('');
  faFire = faFire;
  faStar = faStar;
  faCalendarCheck = faCalendarCheck;
}
