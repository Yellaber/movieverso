import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire, faStar, faCalendarCheck, faArrowTrendUp, faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TypeTag } from '@shared/interfaces';

interface Icon {
  text: TypeTag,
  faIcon: IconDefinition
}

const icons: Icon[] = [
  {text: 'now-playing', faIcon: faFilm}, {text: 'popular', faIcon: faFire},
  {text: 'top-rated', faIcon: faStar}, {text: 'calendar', faIcon: faCalendarCheck},
  {text: 'trending', faIcon: faArrowTrendUp}
];

@Component({
  selector: 'tag',
  imports: [FontAwesomeModule],
  template: `
    @if(getIcon()) {
      <div class="flex items-center rounded-full bg-yellow-900/50 text-yellow-600 gap-2 px-3 py-2">
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
