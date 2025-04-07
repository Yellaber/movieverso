import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { PopularityComponent } from '../../popularity/popularity.component';
import { Movie } from '../../../interfaces/movie-response.interface';
import { VoteComponent } from '../../vote/vote.component';

@Component({
  selector: 'carrusel-card-movies',
  imports: [
    RouterLink,
    PopularityComponent,
    VoteComponent,
    FontAwesomeModule
],
  templateUrl: './carrusel-card-movies.component.html'
})
export class CarruselCardMoviesComponent {
  faBokmark = faBookmark;
  movie = input.required<Movie>();
}
