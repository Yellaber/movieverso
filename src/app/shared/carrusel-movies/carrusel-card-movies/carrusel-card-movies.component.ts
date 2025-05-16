import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { RatingComponent } from '@shared/rating/rating.component';
import { environment } from 'src/app/environments/environment.developments';
import { SlugifyService } from '@services/slugify/slugify.service';
import { Movie } from '@interfaces/movie-response.interface';

@Component({
  selector: 'carrusel-card-movies',
  imports: [
    RouterLink,
    FontAwesomeModule,
    RatingComponent
],
  templateUrl: './carrusel-card-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarruselCardMoviesComponent {
  faBokmark = faBookmark;
  movie = input.required<Movie>();
  srcImage = computed(() => environment.imageUrl + this.movie().poster_path);
  private slugifyService = inject(SlugifyService);

  slugify(title: string): string {
    return this.slugifyService.getSlug(title);
  }
}
