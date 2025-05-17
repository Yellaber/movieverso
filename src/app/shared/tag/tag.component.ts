import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire, faStar, faCalendarCheck, faArrowTrendUp, faFilm,
         IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface Icon {
  text: string,
  faIcon: IconDefinition
}

@Component({
  selector: 'tag',
  imports: [ FontAwesomeModule ],
  templateUrl: './tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  text = input.required<string>();
  type = input<string>('');
  icons: Icon[] = [
    { text: 'now_playing', faIcon: faFilm },
    { text: 'popularity', faIcon: faFire },
    { text: 'rated', faIcon: faStar },
    { text: 'calendar', faIcon: faCalendarCheck },
    { text: 'trending', faIcon: faArrowTrendUp }
  ];

  getIcon(): Icon | undefined {
    return this.icons.find(icon => icon.text === this.type() && icon);
  }
}
