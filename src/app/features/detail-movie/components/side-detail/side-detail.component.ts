import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ProductionCountriesComponent } from './production-countries/production-countries.component';
import { BadgeSectionComponent } from './badge-section/badge-section.component';
import { InfoItemComponent } from './info-item/info-item.component';
import { DetailService } from '../../services/detail.service';
import { DetailMovieResponse } from '@shared/interfaces';

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
  private detailService = inject(DetailService);
  movieDetail = input.required<DetailMovieResponse>();
  movieId = computed<number>(() => this.movieDetail().id);
  movieKeywords = rxResource({
    request: this.movieId,
    loader: () => this.movieId()? this.detailService.getMovieKeywords(this.movieId()!): of([])
  });
}
