import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductionCountriesSkeletonComponent } from './production-countries-skeleton/production-countries-skeleton.component';
import { BadgeSectionSkeletonComponent } from './badge-section-skeleton/badge-section-skeleton.component';
import { InfoItemSkeletonComponent } from './info-item-skeleton/info-item-skeleton.component';

@Component({
  selector: 'side-detail-skeleton',
  imports: [
    ProductionCountriesSkeletonComponent,
    BadgeSectionSkeletonComponent,
    InfoItemSkeletonComponent
],
  templateUrl: './side-detail-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden lg:flex flex-col w-1/4 rounded-md shadow-md bg-stone-800 animate-pulse gap-8 p-10' }
})
export class SideDetailSkeletonComponent { }
