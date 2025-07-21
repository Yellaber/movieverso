import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'banner-hero-skeleton',
  imports: [],
  templateUrl: './banner-hero-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center rounded-md shadow-md bg-stone-800 md:gap-10 lg:gap-20 p-5 md:p-10 mt-10 mb-3 mt-20 mb-10' }
})
export class BannerHeroSkeletonComponent { }
