import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Rating } from '@components/rating/rating';
import { ImageService } from '@services';
import { SlugifyUtils } from '@utils';
import { Movie } from '@interfaces';

@Component({
  selector: 'carousel-card-movies',
  imports: [ RouterLink, NgOptimizedImage, Rating ],
  templateUrl: './carousel-card-movies.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col min-w-[160px] max-w-[160px] rounded-md shadow-md' }
})
export class CarouselCardMovies {
  private imageService = inject(ImageService);
  movie = input.required<Movie>();
  bgCardFooter = input.required<string>();
  getBgClassCardFooter = computed<string>(() =>
    `flex justify-between items-center ${this.bgCardFooter()} rounded-b-md p-3`
  );
  getPosterImagePath = computed<string>(() => this.imageService.getPosterImagePath(this.movie()));
  getPosterImageSrcset = computed<string>(() => this.imageService.getPosterImageSrcset(this.movie()));
  getPosterTitle = computed<string>(() => this.imageService.getPosterTitle(this.movie()));
  getMovieLink = computed<string[]>(() => {
    const { id, title } = this.movie();
    const slug = SlugifyUtils.getSlug(title);
    return ['/movie', `${id}-${slug}`];
  });
}
