import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BadgeList } from '@components/badge-list/badge-list';
import { Rating } from '@components/rating/rating';
import { Tag } from '@components/tag/tag';
import { TmdbService } from '@services';
import { SlugifyUtils } from '@utils';
import { Genre, Movie } from '@interfaces';

@Component({
  selector: 'short-information',
  imports: [ Tag, Rating, BadgeList, RouterLink, TranslatePipe ],
  templateUrl: './short-information.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col w-full md:w-1/2 lg:w-2/3 z-10 gap-5' }
})
export class ShortInformation {
  private tmdbService = inject(TmdbService);
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
  private movieGenreIds = computed<number[]>(() => this.movie().genre_ids);
  private genresMovie = rxResource({
    params: this.movieGenreIds,
    stream: ({ params }) => this.tmdbService.getGenresMovieByIds(params)
  });
  getGenres = computed<Genre[]>(() => this.genresMovie.value()?? []);
  getSlugify = computed(() => SlugifyUtils.getSlug(this.movie().title));
}
