import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../interfaces/movie-response.interface';
import { Genre } from '../../interfaces/genre-movies-response.interface';
import { TagComponent } from '../../shared/tag/tag.component';
import { PopularityComponent } from '../../shared/popularity/popularity.component';
import { VoteComponent } from '../../shared/vote/vote.component';
import { BadgeListComponent } from '../../shared/badge-list/bandge-list.component';
import { BackdropImageComponent } from '../../shared/backdrop-image/backdrop-image.component';

type typeTag = 'popularity' | 'rated' | '';

@Component({
  selector: 'banner-hero',
  imports: [
    TagComponent,
    PopularityComponent,
    VoteComponent,
    BadgeListComponent,
    BackdropImageComponent,
    RouterLink,
],
  templateUrl: './banner-hero.component.html'
})
export class BannerHeroComponent {
  heroType = input.required<typeTag>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  genres = input.required<Genre[]>();
  genresPopularMovie = computed<Genre[]>(() =>
    this.genres().filter(genre => this.movie().genre_ids.includes(genre.id))
  );
}
