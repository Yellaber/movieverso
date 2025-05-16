import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductionCountriesComponent } from './production-countries/production-countries.component';
import { BadgeSectionComponent } from './badge-section/badge-section.component';
import { InfoItemComponent } from './info-item/info-item.component';
import { DetailMovieResponse } from '@interfaces/detail-movie-response.interface';
import { Keyword } from '@interfaces/movie-keyword-response';

@Component({
  selector: 'side-detail',
  imports: [
    ProductionCountriesComponent,
    BadgeSectionComponent,
    InfoItemComponent
  ],
  templateUrl: './side-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden lg:flex flex-col w-1/4 rounded-md shadow-md bg-stone-800 gap-8 p-10' }
})
export class SideDetailComponent {
  movieDetail = input.required<DetailMovieResponse>();
  movieKeywords = input.required<Keyword[]>();
}
