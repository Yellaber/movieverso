import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { BackgroundImage } from '@components/background-image/background-image';
import { ShortInformation } from './short-information/short-information';
import { BackdropImage } from './backdrop-image/backdrop-image';
import { ImageService } from '@services';
import { Movie } from '@interfaces';

@Component({
  selector: 'banner-hero',
  imports: [ BackgroundImage, ShortInformation, BackdropImage ],
  templateUrl: './banner-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex items-center rounded-md shadow-md p-5 md:p-10 mt-10 lg:mt-20 mb-10' }
})
export class BannerHero {
  private imageService = inject(ImageService);
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  getBackdropImagePath = computed<string>(() => this.imageService.getBackgroundImagePath(this.movie()));
  getBackdropImageSrcset = computed<string>(() => this.imageService.getBackdropImageSrcset(this.movie()));
  getBackdropTitle = computed<string>(() => this.imageService.getBackdropTitle(this.movie()));
}
