import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { PopularityComponent } from '../../popularity/popularity.component';
import { Movie } from '../../../interfaces/movie-response.interface';
import { VoteComponent } from '../../vote/vote.component';
import { environment } from '../../../environments/environment.developments';

@Component({
  selector: 'carrusel-card-movies',
  imports: [
    RouterLink,
    PopularityComponent,
    VoteComponent,
    FontAwesomeModule
],
  templateUrl: './carrusel-card-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarruselCardMoviesComponent {
  faBokmark = faBookmark;
  movie = input.required<Movie>();
  srcImage = computed(() => environment.imageUrl + this.movie().poster_path);
}
