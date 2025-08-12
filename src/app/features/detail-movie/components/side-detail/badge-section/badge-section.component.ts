import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BadgeListComponent } from '@shared/components/badge-list/badge-list.component';
import { Keyword, SpokenLanguage } from '@shared/interfaces';

type typeBadges = Keyword[] | SpokenLanguage[]

@Component({
  selector: 'badge-section',
  imports: [ BadgeListComponent ],
  template: `
    <span class="text-xs lg:text-sm text-yellow-600 font-semibold">{{ titleSection() }}</span>
    <badge-list [badgeList]="badges()"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-4' }
})
export class BadgeSectionComponent {
  titleSection = input.required<string>();
  badges = input.required<typeBadges>();
}
