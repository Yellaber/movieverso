import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { ShortDetailComponent } from './short-detail/short-detail.component';
import { environment } from '@environments/environment';
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
  getBackdropImageUrl = computed(() => {
    const backdropPath = this.movieDetail().backdrop_path;
    return backdropPath? environment.imageUrl + backdropPath: '/images/no-backdrop.jpg';
  });
};
