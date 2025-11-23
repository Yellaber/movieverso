import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ShortInformationComponent } from './short-information/short-information.component';
import { environment } from '@environments/environment';
import { Movie } from '@shared/interfaces';

@Component({
  selector: 'banner-hero',
  imports: [
    ShortInformationComponent,
    NgOptimizedImage
  ],
  templateUrl: './banner-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative flex items-center rounded-md overflow-hidden shadow-md md:gap-10 lg:gap-20 p-5 md:p-10 mt-10 lg:mt-20 mb-10'
  }
})
export class BannerHeroComponent {
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  imageSizes = [300, 500, 780, 1280];
  isBackdropAvailable = computed<boolean>(() => !!this.movie().backdrop_path);
  getBackgroundImageUrl = computed<string>(() =>
    this.isBackdropAvailable()?
    `${environment.imageUrl}original${this.movie().backdrop_path}`: '/images/no-backdrop.jpg'
  );
  getBackdropImagePath = computed<string>(() => this.isBackdropAvailable()? this.movie().backdrop_path: '');
  getBackdropImageSrcset = computed<string>(() =>
    this.isBackdropAvailable()? this.imageSizes.map((size) => `${size}w`).join(', '): ''
  );
}
