import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'banner-hero-skeleton',
  imports: [],
  templateUrl: './banner-hero-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center rounded-md shadow-md animate-pulse bg-stone-800 md:gap-10 lg:gap-20 p-5 md:p-10 mt-5' }
})
export class BannerHeroSkeletonComponent { }
