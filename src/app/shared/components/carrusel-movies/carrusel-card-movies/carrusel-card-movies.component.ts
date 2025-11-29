import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { SlugifyService } from '@shared/services';
import { ImageUtils } from '@shared/utilities/image-utils';
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
  private imageUtils = new ImageUtils();
  movie = input.required<Movie>();
  bgCardFooter = input.required<string>();
  getBgClassCardFooter = computed<string>(() =>
    `flex justify-between items-center ${this.bgCardFooter()} rounded-b-md p-3`
  );
  getPosterImagePath = computed<string>(() => this.imageUtils.getPosterImagePath(this.movie()));
  getPosterImageSrcset = computed<string>(() => this.imageUtils.getPosterImageSrcset(this.movie()));
  getPosterTitle = computed<string>(() => this.imageUtils.getPosterTitle(this.movie()));
  getMovieLink = computed<string[]>(() => {
    const { id, title } = this.movie();
    const slug = this.slugifyService.getSlug(title);
    return ['/movie', `${id}-${slug}`];
  });
}
