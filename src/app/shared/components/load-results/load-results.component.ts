import { ChangeDetectionStrategy, Component, computed, HostListener, OnInit, ResourceRef, inject, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarruselCardMoviesComponent } from '@shared/components/carrusel-movies/carrusel-card-movies/carrusel-card-movies.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { CardMovieSkeletonComponent } from '@shared/components/carrusel-movies-skeleton/card-movie-skeleton/card-movie-skeleton.component';
import { ScrollService } from '@shared/services';
import { MovieResponse } from '@shared/interfaces';

@Component({
  selector: 'load-results',
  imports: [
    CarruselCardMoviesComponent,
    NotificationComponent,
    CardMovieSkeletonComponent,
    TranslatePipe
  ],
  template: `
    <div class="flex flex-wrap justify-evenly gap-5">
      @if(!movies().isLoading()) {
        @for(movie of allMovies(); track movie.id) {
          <carrusel-card-movies [movie]="movie" bgCardFooter="bg-stone-800"/>
        } @empty {
          <notification [notificationTitle]="'loadResult.notification.title' | translate"
          [message]="'loadResult.notification.message' | translate"/>
        }
      } @else {
        @for(_ of cardMoviesSkeleton; track $index) {
          <card-movie-skeleton/>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadResultsComponent implements OnInit {
  private scrollService = inject(ScrollService);
  cardMoviesSkeleton = Array(20);
  page = signal<number>(1);
  movies = input.required<ResourceRef<MovieResponse[] | undefined>>();
  allMovies = computed(() => {
    const responses = this.movies().value();
    return responses? responses.flatMap(response => response.results): [];
  });
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.scrollService.isAtBottom() && this.movies().hasValue()) {
      const responses = this.movies().value();
      if(responses && responses.length > 0) {
        const lastResponse = responses[responses.length - 1];
        if(this.page() < lastResponse.total_pages) {
          this.page.update(value => value + 1);
        }
      }
    }
  };

  ngOnInit() {
    this.scrollService.scrollTop();
  };
}
