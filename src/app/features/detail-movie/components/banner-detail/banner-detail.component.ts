import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { ShortDetailComponent } from './short-detail/short-detail.component';
import { environment } from '@environments/environment.developments';
import { DetailMovieResponse } from '@shared/interfaces';

@Component({
  selector: 'banner-detail',
  imports: [CardDetailComponent, ShortDetailComponent],
  templateUrl: './banner-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex items-center rounded-md overflow-hidden shadow-md p-5 md:p-10' }
})
export class BannerDetailComponent {
  movieDetail = input.required<DetailMovieResponse>();
  backdropImage = computed(() => environment.imageUrl + this.movieDetail().backdrop_path);
}
