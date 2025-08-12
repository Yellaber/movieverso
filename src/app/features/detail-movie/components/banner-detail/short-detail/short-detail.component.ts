import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagComponent } from '@shared/components/tag/tag.component';
import { BadgeListComponent } from '@shared/components/badge-list/badge-list.component';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { DetailMovieResponse } from '@shared/interfaces';

@Component({
  selector: 'short-detail',
  imports: [
    TagComponent,
    BadgeListComponent,
    RatingComponent
  ],
  templateUrl: './short-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative w-full text-stone-50 z-10 md:pl-10 lg:pl-20' }
})
export class ShortDetailComponent {
  movieDetail = input.required<DetailMovieResponse>();
}
