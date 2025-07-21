import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoriesComponent } from '@shared/components/categories/categories.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { LoadRelationedComponent } from '@shared/components/load-relationed/load-relationed.component';
import { SeoFriendlyService } from '@app/core/services';
import { TmdbService } from '@shared/services';

const menuItems = ['upcoming', 'now-playing', 'popular', 'top-rated', 'trending'];

@Component({
  selector: 'recommendations',
  imports: [
    RouterLink,
    CategoriesComponent,
    NotificationComponent,
    LoadRelationedComponent,
  ],
  templateUrl: './recommendations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecommendationsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seoFriendlyService = inject(SeoFriendlyService);
  private tmdbService = inject(TmdbService);
  idSlug = signal<string>('');
  titlePage = signal<string>('');
  menuItems = signal<string[]>([]);
  movieId = signal<number | undefined>(undefined);
  linkSimilarMovies = signal<string>('');
  movie = rxResource({
    request: this.movieId,
    loader: () => this.tmdbService.getMovieById(this.movieId()!)
  });
  titleDescription = computed(() => this.movie.hasValue()? `${this.titlePage()} basadas en:`: '');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idSlug.set(params.get('id-slug') || '');
      this.linkSimilarMovies.set(`/movie/${this.idSlug()}/similar`);
      this.movieId.set(+this.idSlug().split('-')[0]);
    });
    this.menuItems.set(menuItems);
    this.titlePage.set('Películas recomendadas');
    this.seoFriendlyService.setMetaTags(this.titlePage(), '');
  };
}
