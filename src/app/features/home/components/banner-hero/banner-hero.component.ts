import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BackgroundImage } from '@shared/components/background-image/background-image';
import { ShortInformationComponent } from './short-information/short-information.component';
import { BackdropImage } from './backdrop-image/backdrop-image';
import { ImageUtils } from '@shared/utilities/image-utils';
import { Movie } from '@shared/interfaces';

@Component({
  selector: 'banner-hero',
  imports: [
    BackgroundImage,
    ShortInformationComponent,
    BackdropImage
  ],
  templateUrl: './banner-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex items-center rounded-md shadow-md p-5 md:p-10 mt-10 lg:mt-20 mb-10' }
})
export class BannerHeroComponent {
  private imageUtils = new ImageUtils();
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  getBackdropImagePath = computed<string>(() => this.imageUtils.getBackgroundImagePath(this.movie()));
  getBackdropImageSrcset = computed<string>(() => this.imageUtils.getBackdropImageSrcset(this.movie()));
  getBackdropTitle = computed<string>(() => this.imageUtils.getBackdropTitle(this.movie()));
}
