import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BackgroundImage } from '@shared/components/background-image/background-image';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { ShortDetailComponent } from './short-detail/short-detail.component';
import { ImageUtils } from '@shared/utilities/image-utils';
import { DetailMovieResponse } from '@shared/interfaces';

@Component({
  selector: 'banner-detail',
  imports: [
    BackgroundImage,
    CardDetailComponent,
    ShortDetailComponent
  ],
  templateUrl: './banner-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex items-center rounded-md overflow-hidden shadow-md p-5 md:p-10' }
})
export class BannerDetailComponent {
  private imageUtils = new ImageUtils();
  movieDetail = input.required<DetailMovieResponse>();
  getBackdropImagePath = computed<string>(() => this.imageUtils.getBackgroundImagePath(this.movieDetail()));
  getPosterImagePath = computed<string>(() => this.imageUtils.getPosterImagePath(this.movieDetail()));
  getBackdropImageSrcset = computed<string>(() => this.imageUtils.getBackdropImageSrcset(this.movieDetail()));
  getPosterImageSrcset = computed<string>(() => this.imageUtils.getPosterImageSrcset(this.movieDetail()));
  getBackdropTitle = computed<string>(() => this.imageUtils.getBackdropTitle(this.movieDetail()));
  getPosterTitle = computed<string>(() => this.imageUtils.getPosterTitle(this.movieDetail()));
}
