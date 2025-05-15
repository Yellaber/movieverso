import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { environment } from '../../environments/environment.developments';
import { Movie } from '../../interfaces/movie-response.interface';
import { BackdropImageComponent } from './backdrop-image/backdrop-image.component';
import { ShortInformationComponent } from './short-information/short-information.component';

@Component({
  selector: 'banner-hero',
  imports: [
    BackdropImageComponent,
    ShortInformationComponent
  ],
  templateUrl: './banner-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative flex items-center rounded-md shadow-md md:gap-10 lg:gap-20 p-5 md:p-10 mt-5'
  }
})
export class BannerHeroComponent {
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();

  getBackdropImageUrl(): string {
    return environment.imageUrl + this.movie().backdrop_path || '';
  }
}
