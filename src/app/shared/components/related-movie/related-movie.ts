import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Categories } from '../categories/categories';
import { Notification } from '../notification/notification';
import { LoadRelated } from '../load-related/load-related';
import { SeoFriendlyService, TmdbService } from '@services';

const menuItems = ['upcoming', 'now-playing', 'popular', 'top-rated', 'trending'];

@Component({
  selector: 'related-movie',
  imports: [ RouterLink, Categories, Notification, LoadRelated, TranslatePipe ],
  templateUrl: './related-movie.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedMovie {
  private route = inject(ActivatedRoute);
  private seoFriendlyService = inject(SeoFriendlyService);
  private tmdbService = inject(TmdbService);
  private translateService = inject(TranslateService);
  type = input.required<'recommendations' | 'similar'>();
  idSlug = signal<string>('');
  titlePage = signal<string>('');
  menuItems = signal<string[]>([]);
  movieId = computed<number | undefined>(() => (this.idSlug().length > 0)? +this.idSlug().split('-')[0]: undefined);
  linkRelatedMovie = computed<string>(() => {
    const baseUrl = `/movie/${this.idSlug()}`;
    switch (this.type()) {
      case 'similar':
        return `${baseUrl}/recommendations`;
      default:
        return `${baseUrl}/similar`;
    }
  });
  movie = rxResource({
    params: this.movieId,
    stream: ({ params }) => this.tmdbService.getDetailMovieById(params)
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idSlug.set(params.get('id-slug') || '');
    });
    this.menuItems.set(menuItems);
    this.loadTranslationTitle();
    this.seoFriendlyService.setMetaTags(this.titlePage(), '');
  }

  private loadTranslationTitle() {
    this.translateService.get(`${this.type()}.title`).subscribe(title => this.titlePage.set(title));
  }
}
