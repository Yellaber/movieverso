import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire, faStar, faCalendarCheck, faArrowTrendUp,
         faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tag',
  imports: [ FontAwesomeModule ],
  templateUrl: './tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  text = input.required<string>();
  type = input<string>('');
  faFire = faFire;
  faStar = faStar;
  faCalendarCheck = faCalendarCheck;
  faArrowTrendUp = faArrowTrendUp;
  faFilm = faFilm;
}
