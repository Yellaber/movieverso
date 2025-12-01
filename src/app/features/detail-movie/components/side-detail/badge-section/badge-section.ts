import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BadgeList } from '@components/badge-list/badge-list';
import { Keyword, SpokenLanguage } from '@interfaces';

type typeBadges = Keyword[] | SpokenLanguage[]

@Component({
  selector: 'badge-section',
  imports: [ BadgeList ],
  template: `
    <span class="text-xs lg:text-sm text-yellow-600 font-semibold">{{ titleSection() }}</span>
    <badge-list [badgeList]="badges()"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-4' }
})
export class BadgeSection {
  titleSection = input.required<string>();
  badges = input.required<typeBadges>();
}
