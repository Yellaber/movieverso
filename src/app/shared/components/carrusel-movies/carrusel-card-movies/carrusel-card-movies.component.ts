import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { environment } from '@environments/environment.developments';
import { SlugifyService } from '@shared/services';
import { Movie } from '@shared/interfaces';

@Component({
  selector: 'carrusel-card-movies',
  imports: [
    RouterLink,
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
  bgClassCardFooter = computed<string>(() => `flex justify-between items-center ${this.bgCardFooter()} rounded-b-md p-3`);
  srcImage = computed<string>(() => {
    const posterPath = this.movie().poster_path;
    return posterPath? `${environment.imageUrl}${posterPath}`: '/images/no-poster.jpg';
  });
  movieLink = computed<string[]>(() => {
    const movie = this.movie();
    const slug = this.slugifyService.getSlug(movie.title);
    return ['/movie', `${movie.id}-${slug}`];
  });
};
