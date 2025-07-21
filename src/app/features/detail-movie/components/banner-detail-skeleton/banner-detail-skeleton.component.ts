import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'banner-detail-skeleton',
  imports: [],
  templateUrl: './banner-detail-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center bg-cover bg-center rounded-md shadow-md bg-stone-800 p-5 md:p-10 mt-10 lg:mt-15' }
})
export class BannerDetailSkeletonComponent { }
