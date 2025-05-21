import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire, faStar, faCalendarCheck, faArrowTrendUp, faFilm,
         IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface Icon {
  text: string,
  faIcon: IconDefinition
}

const icons: Icon[] = [
  { text: 'now_playing', faIcon: faFilm }, { text: 'popularity', faIcon: faFire },
  { text: 'rated', faIcon: faStar }, { text: 'calendar', faIcon: faCalendarCheck },
  { text: 'trending', faIcon: faArrowTrendUp }
];

@Component({
  selector: 'tag',
  imports: [ FontAwesomeModule ],
  template: `
    @if(getIcon()) {
      <div class="flex items-center rounded-full bg-stone-800 text-yellow-600 gap-2 px-3 py-2">
        <fa-icon [icon]="getIcon()!.faIcon"></fa-icon>
        <span class="text-xs lg:text-sm">{{ text() }}</span>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex' }
})
export class TagComponent {
  text = input.required<string>();
  type = input<string>('');
  getIcon = computed(() => icons.find(icon => icon.text === this.type()));
}
