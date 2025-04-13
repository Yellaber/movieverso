import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagComponent } from '../../../shared/tag/tag.component';
import { DetailMovieResponse } from '../../../interfaces/detail-movie-response.interface';
import { BadgeListComponent } from '../../../shared/badge-list/badge-list.component';
import { PopularityComponent } from '../../../shared/popularity/popularity.component';
import { VoteComponent } from '../../../shared/vote/vote.component';

@Component({
  selector: 'short-detail',
  imports: [
    TagComponent,
    BadgeListComponent,
    PopularityComponent,
    VoteComponent
  ],
  templateUrl: './short-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative text-stone-50 z-10 md:pl-10 lg:pl-20' }
})
export class ShortDetailComponent {
  movieDetail = input.required<DetailMovieResponse>();
}
