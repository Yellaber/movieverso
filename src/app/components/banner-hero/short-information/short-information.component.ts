import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeListComponent } from '@shared/badge-list/bandge-list.component';
import { RatingComponent } from '@shared/rating/rating.component';
import { TagComponent } from '@shared/tag/tag.component';
import { SlugifyService } from '@services/slugify/slugify.service';
import { TmdbService } from '@services/tmdb/tmdb.service';
import { Movie } from '@interfaces/movie-response.interface';
import { Genre } from '@interfaces/genre-movies-response.interface';

@Component({
  selector: 'short-information',
  imports: [
    TagComponent,
    RatingComponent,
    BadgeListComponent,
    RouterLink
  ],
  templateUrl: './short-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col w-full md:w-1/2 lg:w-2/3 z-10 gap-5' }
})
export class ShortInformationComponent implements OnInit {
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  genres = signal<Genre[]>([]);
  private tmdbService = inject(TmdbService);
  private slugifyService = inject(SlugifyService);

  ngOnInit(): void {
    this.getGenresMovie();
  }

  slugify(title: string): string {
    return this.slugifyService.getSlug(title);
  }

  getGenresMovie() {
    this.tmdbService.getGenreMovieList(this.movie().genre_ids)
      .subscribe(genres => this.genres.set(genres));
  }
}
