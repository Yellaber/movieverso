import { Component, computed, input } from '@angular/core';
import { TagComponent } from '../../shared/tag/tag.component';
import { PopularityComponent } from '../../shared/popularity/popularity.component';
import { VoteComponent } from '../../shared/vote/vote.component';
import { GenreListComponent } from '../../shared/genre-list/genre-list.component';
import { BackdropImageComponent } from '../../shared/backdrop-image/backdrop-image.component';
import { RouterLink } from '@angular/router';
import { Movie } from '../../interfaces/movie-response.interface';
import { Genre } from '../../interfaces/genre-movies-response.interface';

type typeTag = 'popularity' | 'rated' | '';

@Component({
  selector: 'banner-hero',
  imports: [
    TagComponent,
    PopularityComponent,
    VoteComponent,
    GenreListComponent,
    BackdropImageComponent,
    RouterLink
  ],
  templateUrl: './banner-hero.component.html'
})
export class BannerHeroComponent {
  heroType = input.required<typeTag>();
  movie = input.required<Movie>();
  genres = input.required<Genre[]>();
  genresPopularMovie = computed<Genre[]>(() =>
    this.genres().filter(genre => this.movie().genre_ids.includes(genre.id))
  );
}
