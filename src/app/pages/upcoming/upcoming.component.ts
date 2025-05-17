import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoFriendlyService } from '@services/seo-friendly.service';

@Component({
  imports: [],
  templateUrl: './upcoming.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UpcomingComponent {
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Próximamente', 'Esta es la página para las películas que estarán próximamente en cine');
  }
}
