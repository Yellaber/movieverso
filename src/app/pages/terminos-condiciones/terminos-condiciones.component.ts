import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SeoFriendlyService } from '@services/seo-friendly.service';

@Component({
  imports: [],
  templateUrl: './terminos-condiciones.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TerminosCondicionesComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Términos y condiciones', 'Esta es la página para los términos y condiciones del sitio');
  }
}
