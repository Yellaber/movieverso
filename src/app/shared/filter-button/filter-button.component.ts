import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'filter-button',
  imports: [ FontAwesomeModule ],
  templateUrl: './filter-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex flex-col items-center' }
})
export class FilterButtonComponent {
  faSliders = faSliders;
  emmitClick = output<boolean>();

  onClick() {
    this.emmitClick.emit(true);
  };
}
