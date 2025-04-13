import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { environment } from '../../environments/environment.developments';
import { Movie } from '../../interfaces/movie-response.interface';
import { Genre } from '../../interfaces/genre-movies-response.interface';
import { BackdropImageComponent } from './backdrop-image/backdrop-image.component';
import { ShortInformationComponent } from './short-information/short-information.component';

type typeTag = 'popularity' | 'rated' | '';

@Component({
  selector: 'banner-hero',
  imports: [
    BackdropImageComponent,
    ShortInformationComponent
  ],
  templateUrl: './banner-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerHeroComponent {
  heroType = input.required<typeTag>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  genres = input.required<Genre[]>();

  getBackdropImageUrl(): string {
    if(!this.movie() || !this.movie().backdrop_path) {
      return '';
    }
    return environment.imageUrl + this.movie().backdrop_path;
  }
}
