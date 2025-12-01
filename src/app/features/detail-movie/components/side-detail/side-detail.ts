import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionCountries } from './production-countries/production-countries';
import { BadgeSection } from './badge-section/badge-section';
import { InfoItem } from './info-item/info-item';
import { DetailService } from '@services';
import { DetailMovie } from '@interfaces';

@Component({
  selector: 'side-detail',
  imports: [ ProductionCountries, BadgeSection, InfoItem, TranslatePipe ],
  templateUrl: './side-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden lg:flex flex-col w-1/4 rounded-md shadow-md bg-stone-800 gap-8 p-10' }
})
export class SideDetail {
  private detailService = inject(DetailService);
  movieDetail = input.required<DetailMovie>();
  movieId = computed<number>(() => this.movieDetail().id);
  movieKeywords = rxResource({
    params: this.movieId,
    stream: ({ params }) => params? this.detailService.getMovieKeywords(params): of([])
  });
}
