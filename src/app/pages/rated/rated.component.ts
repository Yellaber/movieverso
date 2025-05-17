import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SeoFriendlyService } from '@services/seo-friendly.service';

@Component({
  imports: [],
  templateUrl: './rated.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RatedComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Más valoradas', 'Esta es la página para las películas más valoradas');
  }
}
