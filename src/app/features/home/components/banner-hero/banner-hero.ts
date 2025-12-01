import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BackgroundImage } from '@components/background-image/background-image';
import { ShortInformation } from './short-information/short-information';
import { BackdropImage } from './backdrop-image/backdrop-image';
import { ImageUtils } from '@utils';
import { Movie } from '@interfaces';

@Component({
  selector: 'banner-hero',
  imports: [ BackgroundImage, ShortInformation, BackdropImage ],
  templateUrl: './banner-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex items-center rounded-md shadow-md p-5 md:p-10 mt-10 lg:mt-20 mb-10' }
})
export class BannerHero {
  private imageUtils = new ImageUtils();
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  getBackdropImagePath = computed<string>(() => this.imageUtils.getBackgroundImagePath(this.movie()));
  getBackdropImageSrcset = computed<string>(() => this.imageUtils.getBackdropImageSrcset(this.movie()));
  getBackdropTitle = computed<string>(() => this.imageUtils.getBackdropTitle(this.movie()));
}
