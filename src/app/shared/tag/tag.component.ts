import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire, faStar } from '@fortawesome/free-solid-svg-icons';

type typeTag = 'popularity' | 'vote' | '';

@Component({
  selector: 'tag',
  imports: [ FontAwesomeModule ],
  templateUrl: './tag.component.html'
})
export class TagComponent {
  text = input.required<string>();
  type = input<typeTag>('');
  faFire = faFire;
  faStar = faStar;
}
