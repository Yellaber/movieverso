import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { ShortDetailComponent } from './short-detail/short-detail.component';
import { DetailMovieResponse } from '@shared/interfaces';

@Component({
  selector: 'banner-detail',
  imports: [
    CardDetailComponent,
    ShortDetailComponent,
    NgOptimizedImage
  ],
  templateUrl: './banner-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex items-center rounded-md overflow-hidden shadow-md p-5 md:p-10' }
})
export class BannerDetailComponent {
  movieDetail = input.required<DetailMovieResponse>();
  imageSizes = [300, 500, 780, 1280];
  isBackdropAvailable = computed<boolean>(() => !!this.movieDetail().backdrop_path);
  getBackdropImagePath = computed<string>(() =>
    this.isBackdropAvailable()? this.movieDetail().backdrop_path: '/images/no-backdrop.jpg'
  );
  getBackdropImageSrcset = computed<string>(() =>
    this.isBackdropAvailable()? this.imageSizes.map((size) => `${size}w`).join(', '): ''
  );
}
