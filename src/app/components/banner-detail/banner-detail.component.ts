import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DetailMovieResponse } from '../../interfaces/detail-movie-response.interface';
import { environment } from '../../environments/environment.developments';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { ShortDetailComponent } from './short-detail/short-detail.component';

@Component({
  selector: 'banner-detail',
  imports: [
    CardDetailComponent,
    ShortDetailComponent
  ],
  templateUrl: './banner-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerDetailComponent {
  movieDetail = input.required<DetailMovieResponse>();
  posterImage = computed(() => environment.imageUrl + this.movieDetail().poster_path);
  backdropImage = computed(() => environment.imageUrl + this.movieDetail().backdrop_path);
}
