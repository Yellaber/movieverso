import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SeoFriendlyService } from '@services/seo-friendly.service';

@Component({
  imports: [],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit(): void {
    this.seoFriendlyService.setMetaTags('List', 'Esta es la página de listado de películas');
  }
}
