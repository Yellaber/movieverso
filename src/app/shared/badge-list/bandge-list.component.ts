import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Genre } from '../../interfaces/genre-movies-response.interface';
import { Keyword } from '../../interfaces/movie-keyword-response';
import { SpokenLanguage } from '../../interfaces/detail-movie-response.interface';

type typeBadges = Genre[] | Keyword[] | SpokenLanguage[]

@Component({
  selector: 'badge-list',
  imports: [],
  template: `
    @for(badge of badgeList(); track $index) {
      <small class="bg-stone-100 rounded-full text-stone-900 font-semibold px-2.5 py-1.5">{{ badge.name }}</small>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-wrap items-center gap-3' }
})
export class BadgeListComponent {
  badgeList = input.required<typeBadges>();
}
