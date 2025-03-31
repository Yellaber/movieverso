import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {
  keySearch = input.required<string>();
  onKeySearch = output<string>();

  eventSearch() {
    this.onKeySearch.emit(this.keySearch().toLowerCase().trim());
  };
}
