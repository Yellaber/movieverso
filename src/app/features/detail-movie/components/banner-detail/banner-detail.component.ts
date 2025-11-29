import { ChangeDetectionStrategy, Component, computed, input, OnInit, signal } from '@angular/core';
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
export class BannerDetailComponent implements OnInit {
  movieDetail = input.required<DetailMovieResponse>();
  imageUtils = signal(new ImageUtils());
  isBackdropAvailable = computed<boolean>(() => this.imageUtils().isBackgroundImagePathAvailable());
  isPosterAvailable = computed<boolean>(() => this.imageUtils().isPosterImagePathAvailable());
  getBackdropImagePath = computed<string>(() => this.imageUtils().getBackgroundImagePath());
  getPosterImagePath = computed<string>(() => this.imageUtils().getPosterImagePath());
  getBackdropImageSrcset = computed<string>(() => this.imageUtils().getBackdropImageSrcset());
  getPosterImageSrcset = computed<string>(() => this.imageUtils().getPosterImageSrcset());
  getBackdropTitle = computed<string>(() => this.imageUtils().getBackdropTitle());
  getPosterTitle = computed<string>(() => this.imageUtils().getPosterTitle());

  ngOnInit() {
    this.imageUtils().setMovie(this.movieDetail());
  };
}
