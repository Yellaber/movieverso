import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SeoFriendlyService } from '../../services/seo-friendly/SeoFriendly.service';

@Component({
  selector: 'popular',
  imports: [],
  templateUrl: './popular.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PopularComponent implements OnInit {
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit(): void {
    this.seoFriendlyService.setMetaTags('Popular', 'Esta es la página para las películas populres');
  }
}
