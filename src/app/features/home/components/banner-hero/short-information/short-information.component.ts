import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BadgeListComponent } from '@shared/components/badge-list/badge-list.component';
import { RatingComponent } from '@shared/components/rating/rating.component';
import { TagComponent } from '@shared/components/tag/tag.component';
import { SlugifyService, TmdbService } from '@shared/services';
import { Genre, Movie } from '@shared/interfaces';

@Component({
  selector: 'short-information',
  imports: [
    TagComponent,
    RatingComponent,
    BadgeListComponent,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './short-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col w-full md:w-1/2 lg:w-2/3 z-10 gap-5' }
})
export class ShortInformationComponent {
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  private tmdbService = inject(TmdbService);
  private slugifyService = inject(SlugifyService);
  private movieGenreIds = computed<number[]>(() => this.movie().genre_ids);
  private genresResource = rxResource({
    params: this.movieGenreIds,
    stream: ({ params }) => this.tmdbService.getGenreMovieListByIds(params)
  });
  genres = computed<Genre[]>(() => this.genresResource.value()?? []);

  slugify(title: string): string {
    return this.slugifyService.getSlug(title);
  };
}
