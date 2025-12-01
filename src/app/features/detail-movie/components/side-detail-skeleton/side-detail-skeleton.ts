import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductionCountriesSkeleton } from './production-countries-skeleton/production-countries-skeleton';
import { BadgeSectionSkeleton } from './badge-section-skeleton/badge-section-skeleton';
import { InfoItemSkeleton } from './info-item-skeleton/info-item-skeleton';

@Component({
  selector: 'side-detail-skeleton',
  imports: [ ProductionCountriesSkeleton, BadgeSectionSkeleton, InfoItemSkeleton ],
  templateUrl: './side-detail-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden lg:flex flex-col w-1/4 rounded-md shadow-md bg-stone-800 gap-8 p-10' }
})
export class SideDetailSkeleton { }
