import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
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
  movie = input.required<Movie>();
  bgCardFooter = input.required<string>();
  imageUtils = signal(new ImageUtils());
  getBgClassCardFooter = computed<string>(() =>
    `flex justify-between items-center ${this.bgCardFooter()} rounded-b-md p-3`
  );
  getPosterImagePath = computed<string>(() => this.imageUtils().getPosterImagePath());
  getPosterImageSrcset = computed<string>(() => this.imageUtils().getPosterImageSrcset());
  getPosterTitle = computed<string>(() => this.imageUtils().getPosterTitle());
  getMovieLink = computed<string[]>(() => {
    const { id, title } = this.movie();
    const slug = this.slugifyService.getSlug(title);
    return ['/movie', `${id}-${slug}`];
  });

  ngOnInit() {
    this.imageUtils().setMovie(this.movie());
  };
}
