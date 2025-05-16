import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { ShortDetailComponent } from './short-detail/short-detail.component';
import { DetailMovieResponse } from '@interfaces/detail-movie-response.interface';
import { environment } from 'src/app/environments/environment.developments';

@Component({
  selector: 'banner-detail',
  imports: [
    CardDetailComponent,
    ShortDetailComponent
  ],
  templateUrl: './banner-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative flex items-center rounded-md shadow-md p-5 md:p-10 mt-5' }
})
export class BannerDetailComponent {
  movieDetail = input.required<DetailMovieResponse>();
  backdropImage = computed(() => environment.imageUrl + this.movieDetail().backdrop_path);
}
