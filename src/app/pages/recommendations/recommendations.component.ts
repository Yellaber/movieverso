import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoriesComponent } from '@shared/categories/categories.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { LoadResultsComponent } from '@shared/load-results/load-results.component';
import { SeoFriendlyService, TmdbService } from '@services/';

const menuItems = ['upcoming', 'now-playing', 'popular', 'top-rated', 'trending'];

@Component({
  selector: 'recommendations',
  imports: [
    RouterLink,
    CategoriesComponent,
    NotificationComponent,
    LoadResultsComponent,
  ],
  templateUrl: './recommendations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RecommendationsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seoFriendlyService = inject(SeoFriendlyService);
  private tmdbService = inject(TmdbService);
  titlePage = signal<string>('');
  menuItems = signal<string[]>([]);
  movieId = signal<number | undefined>(undefined);
  linkSimilarMovies = signal<string>('');
  movie = rxResource({
    request: this.movieId,
    loader: () => this.tmdbService.getMovieById(this.movieId()!)
  });
  titleDescription = computed(() =>
    this.movie.hasValue()? `${this.titlePage()} basadas en: "${this.movie.value().title}"`: ''
  );

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idSlug = params.get('id-slug') || '';
      this.linkSimilarMovies.set(`/movie/${idSlug}/similar`);
      this.movieId.set(+idSlug.split('-')[0]);
    });
    this.menuItems.set(menuItems);
    this.titlePage.set('Películas recomendadas');
    this.seoFriendlyService.setMetaTags(this.titlePage(), '');
  };
}
