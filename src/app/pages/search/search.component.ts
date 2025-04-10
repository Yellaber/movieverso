import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'search',
  imports: [],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SearchComponent {
  keySearch = input.required<string>();
  onKeySearch = output<string>();

  eventSearch() {
    this.onKeySearch.emit(this.keySearch().toLowerCase().trim());
  };
}
