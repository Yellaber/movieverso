import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { SlugifyService } from '@shared/services';
import { Movie } from '@shared/interfaces';

@Component({
  selector: 'carrusel-card-movies',
  imports: [
    RouterLink,
    NgOptimizedImage,
    RatingComponent
  ],
  templateUrl: './carrusel-card-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col min-w-[160px] max-w-[160px] rounded-md shadow-md' }
})
export class CarruselCardMoviesComponent {
  private slugifyService = inject(SlugifyService);
  movie = input.required<Movie>();
  bgCardFooter = input.required<string>();
  posterImageSizes = [92, 154, 185, 342, 500, 780];
  getBgClassCardFooter = computed<string>(() =>
    `flex justify-between items-center ${this.bgCardFooter()} rounded-b-md p-3`
  );
  isPosterAvailable = computed<boolean>(() => !!this.movie().poster_path);
  getPosterImagePath = computed<string>(() =>
    this.isPosterAvailable()? this.movie().poster_path: '/images/no-poster.jpg'
  );
  getPosterImageSrcset = computed<string>(() =>
    this.isPosterAvailable()? this.posterImageSizes.map((size) => `${size}w`).join(', '): ''
  );
  getMovieLink = computed<string[]>(() => {
    const { id, title } = this.movie();
    const slug = this.slugifyService.getSlug(title);
    return ['/movie', `${id}-${slug}`];
  });
}
