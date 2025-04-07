import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopularityComponent } from "../../popularity/popularity.component";
import { Movie } from '../../../interfaces/movie-response.interface';
import { VoteComponent } from "../../vote/vote.component";

@Component({
  selector: 'carrusel-card-movies',
  imports: [
    RouterLink,
    PopularityComponent,
    VoteComponent
],
  templateUrl: './carrusel-card-movies.component.html'
})
export class CarruselCardMoviesComponent {
  movie = input.required<Movie>();
}
