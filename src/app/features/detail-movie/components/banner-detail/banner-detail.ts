import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { BackgroundImage } from '@components/background-image/background-image';
import { CardDetail } from './card-detail/card-detail';
import { ShortDetail } from './short-detail/short-detail';
import { ImageService } from '@services';
import { DetailMovie } from '@interfaces';

@Component({
  selector: 'banner-detail',
  imports: [ BackgroundImage, CardDetail, ShortDetail ],
  templateUrl: './banner-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex items-center rounded-md overflow-hidden shadow-md p-5 md:p-10' }
})
export class BannerDetail {
  private imageService = inject(ImageService);
  movieDetail = input.required<DetailMovie>();
  getBackdropImagePath = computed<string>(() => this.imageService.getBackgroundImagePath(this.movieDetail()));
  getPosterImagePath = computed<string>(() => this.imageService.getPosterImagePath(this.movieDetail()));
  getBackdropImageSrcset = computed<string>(() => this.imageService.getBackdropImageSrcset(this.movieDetail()));
  getPosterImageSrcset = computed<string>(() => this.imageService.getPosterImageSrcset(this.movieDetail()));
  getBackdropTitle = computed<string>(() => this.imageService.getBackdropTitle(this.movieDetail()));
  getPosterTitle = computed<string>(() => this.imageService.getPosterTitle(this.movieDetail()));
}
