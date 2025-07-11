import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoriesComponent } from '@shared/categories/categories.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { LoadResultsComponent } from '@shared/load-results/load-results.component';
import { SeoFriendlyService, TmdbService } from '@services/';

const menuItems = ['upcoming', 'now-playing', 'popular', 'top-rated', 'trending'];

@Component({
  selector: 'similars',
  imports: [
    CategoriesComponent,
    NotificationComponent,
    LoadResultsComponent,
    RouterLink
  ],
  templateUrl: './similars.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SimilarsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seoFriendlyService = inject(SeoFriendlyService);
  private tmdbService = inject(TmdbService);
  titlePage = signal<string>('');
  menuItems = signal<string[]>([]);
  movieId = signal<number | undefined>(undefined);
  linkRecommendationsMovies = signal<string>('');
  movie = rxResource({
    request: this.movieId,
    loader: () => this.tmdbService.getMovieById(this.movieId()!)
  });
  titleDescription = computed(() =>
    this.movie.hasValue()? `${this.titlePage()} a: "${this.movie.value().title}"`: ''
  );

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idSlug = params.get('id-slug') || '';
      this.linkRecommendationsMovies.set(`/movie/${idSlug}/recommendations`);
      this.movieId.set(+idSlug.split('-')[0]);
    });
    this.menuItems.set(menuItems);
    this.titlePage.set('Películas similares');
    this.seoFriendlyService.setMetaTags(this.titlePage(), '');
  };
}
