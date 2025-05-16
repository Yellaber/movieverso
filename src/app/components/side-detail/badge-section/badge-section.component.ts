import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SpokenLanguage } from '@interfaces/detail-movie-response.interface';
import { Keyword } from '@interfaces/movie-keyword-response';
import { BadgeListComponent } from '@shared/badge-list/bandge-list.component';

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
