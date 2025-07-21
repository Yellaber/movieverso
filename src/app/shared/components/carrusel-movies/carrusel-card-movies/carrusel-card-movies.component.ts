import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { environment } from '@environments/environment.developments';
import { SlugifyService } from '@shared/services';
import { Movie } from '@shared/interfaces';

@Component({
  selector: 'carrusel-card-movies',
  imports: [
    RouterLink,
    FontAwesomeModule,
    RatingComponent
  ],
  templateUrl: './carrusel-card-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col min-w-[160px] max-w-[160px] rounded-md shadow-md' }
})
export class CarruselCardMoviesComponent {
  faBokmark = faBookmark;
  movie = input.required<Movie>();
  bgCardFooter = input.required<string>();
  srcImage = computed(() => environment.imageUrl + this.movie().poster_path);
  bgClassCardFooter = computed<string>(() => `flex justify-between items-center ${this.bgCardFooter()} rounded-b-md p-3`);
  private slugifyService = inject(SlugifyService);

  slugify(title: string): string {
    return this.slugifyService.getSlug(title);
  };
}
