import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SeoFriendlyService } from '@services/seo-friendly.service';

@Component({
  imports: [],
  templateUrl: './released.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReleasedComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('En estreno', 'Esta es la página para las películas en estreno');
  }
}
