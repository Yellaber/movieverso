import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { SeoFriendlyService } from '@services/seo-friendly.service';

@Component({
  imports: [],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SearchComponent implements OnInit {
  keySearch = input.required<string>();
  onKeySearch = output<string>();
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit(): void {
    this.seoFriendlyService.setMetaTags('Search', 'Esta es la página para las busquedas de películas');
  }

  eventSearch() {
    this.onKeySearch.emit(this.keySearch().toLowerCase().trim());
  }
}
