import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeListComponent } from '@shared/components/badge-list/bandge-list.component';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { TagComponent } from '@shared/components/tag/tag.component';
import { SlugifyService, TmdbService } from '@shared/services';
import { Movie, Genre } from '@shared/interfaces';

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

  ngOnInit() {
    this.getGenresMovie();
  };

  slugify(title: string): string {
    return this.slugifyService.getSlug(title);
  };

  getGenresMovie() {
    this.tmdbService.getGenreMovieListByIds(this.movie().genre_ids)
      .subscribe(genres => this.genres.set(genres));
  };
}
