import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NavigationComponent } from '@shared/navigation/navigation.component';

@Component({
  selector: 'scrollable-menu',
  imports: [ NavigationComponent ],
  templateUrl: './scrollable-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative' }
})
export class ScrollableMenuComponent {
  items = input.required<string[]>();
}
