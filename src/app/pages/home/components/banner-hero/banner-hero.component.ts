import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ShortInformationComponent } from './short-information/short-information.component';
import { BackdropImageComponent } from './backdrop-image/backdrop-image.component';
import { environment } from '@environments/environment.developments';
import { Movie } from '@interfaces/';

@Component({
  selector: 'banner-hero',
  imports: [
    ShortInformationComponent,
    BackdropImageComponent
  ],
  templateUrl: './banner-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative flex items-center rounded-md shadow-md md:gap-10 lg:gap-20 p-5 md:p-10 mt-10 lg:mt-20 mb-10'
  }
})
export class BannerHeroComponent {
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  getBackdropImageUrl = computed<string>(() => environment.imageUrl + this.movie().backdrop_path || '');
}
