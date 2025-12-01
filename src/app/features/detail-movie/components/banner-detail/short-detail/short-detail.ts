import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tag } from '@components/tag/tag';
import { BadgeList } from '@components/badge-list/badge-list';
import { Rating } from '@components/rating/rating';
import { DetailMovie } from '@interfaces';

@Component({
  selector: 'short-detail',
  imports: [ Tag, BadgeList, Rating ],
  templateUrl: './short-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative w-full text-stone-50 z-10 md:pl-10 lg:pl-20' }
})
export class ShortDetail {
  movieDetail = input.required<DetailMovie>();
}
