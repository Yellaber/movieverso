import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SeoFriendlyService } from '@app/core/services/seo-friendly.service';

@Component({
  imports: [],
  templateUrl: './politica-privacidad.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PoliticaPrivacidadComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Política de privacidad', '');
  }
}
