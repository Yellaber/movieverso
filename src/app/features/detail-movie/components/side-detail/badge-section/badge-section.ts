import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BadgeList } from '@components/badge-list/badge-list';
import { Keyword, ProductionCompany, SpokenLanguage } from '@interfaces';

type typeBadgesSection = Keyword[] | SpokenLanguage[] | ProductionCompany[];

@Component({
  selector: 'badge-section',
  imports: [ BadgeList ],
  template: `
    @if(titleSection() && hasBadges()) {
      <span class="text-xs lg:text-sm text-yellow-600 font-semibold">{{ titleSection() }}</span>
      <badge-list [badgeList]="badges()"/>
      <hr class="text-stone-700 mt-5">
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-4' }
})
export class BadgeSection {
  titleSection = input.required<string>();
  badges = input.required<typeBadgesSection>();
  hasBadges = computed<boolean>(() => {
    const badges = this.badges();
    return badges && badges.length > 0;
  });
}
