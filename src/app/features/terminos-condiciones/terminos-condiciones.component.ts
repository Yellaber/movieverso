import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SecondaryHeaderComponent } from './components/secondary-header/secondary-header.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { ScrollService } from '@shared/services';
import { SeoFriendlyService } from '@app/core/services';

@Component({
  selector: 'terminos-condiciones',
  imports: [
    SecondaryHeaderComponent,
    ParagraphComponent
  ],
  templateUrl: './terminos-condiciones.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col text-xs lg:text-sm text-stone-300 mt-10 lg:mt-15' }
})
export default class TerminosCondicionesComponent implements OnInit {
  private scrollService = inject(ScrollService);
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Términos y condiciones', '');
    this.scrollService.scrollTop();
  }
}
