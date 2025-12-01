import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Genre, Keyword, SpokenLanguage } from '@interfaces';

type typeBadges = Genre[] | Keyword[] | SpokenLanguage[]

@Component({
  selector: 'badge-list',
  imports: [],
  template: `
    @for(badge of badgeList(); track $index) {
      @if(badge.name) {
        <small data-testid="badge" class="bg-stone-100 rounded-full text-stone-900 font-semibold px-2.5 py-1.5">{{ badge.name }}</small>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-wrap items-center gap-3' }
})
export class BadgeList {
  badgeList = input.required<typeBadges>();
}
