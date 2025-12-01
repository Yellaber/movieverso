import { ChangeDetectionStrategy, Component, computed, HostListener, OnInit, ResourceRef, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselCardMovies } from '@components/carousel-movies/carousel-card-movies/carousel-card-movies';
import { Notification } from '@components/notification/notification';
import { CardMovieSkeleton } from '@components/carousel-movies-skeleton/card-movie-skeleton/card-movie-skeleton';
import { ScrollService } from '@services';
import { PaginationUtils } from '@utils';
import { Movie, PaginatedMovies } from '@interfaces';

@Component({
  selector: 'infinite-scroll',
  imports: [ CarouselCardMovies, Notification, CardMovieSkeleton, TranslatePipe ],
  template: `
    <div class="flex flex-wrap justify-evenly gap-5 mb-5 lg:mb-10">
      @if(!paginatedMovies().isLoading()) {
        @for(movie of movies(); track movie.id) {
          <carousel-card-movies [movie]="movie" bgCardFooter="bg-stone-800"/>
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
export class InfiniteScroll implements OnInit {
  private scrollService = inject(ScrollService);
  private paginationUtils = new PaginationUtils();
  cardMoviesSkeleton = Array(20);
  getPage = computed(() => this.paginationUtils.getPage());
  paginatedMovies = input.required<ResourceRef<PaginatedMovies[] | undefined>>();
  movies = computed<Movie[]>(() => {
    const responses = this.paginatedMovies().value();
    return responses? responses.flatMap(response => response.results): [];
  });
  hasNextPage = computed<boolean>(() => {
    const responses = this.paginatedMovies().value();
    if(responses && responses.length > 0) {
      const lastResponse = responses[responses.length - 1];
      return this.paginationUtils.getPage() < lastResponse.total_pages;
    }
    return false;
  });
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.scrollService.isAtBottom() && !this.paginatedMovies().isLoading()) {
      this.hasNextPage() && this.paginationUtils.next();
    }
  };

  ngOnInit() {
    this.scrollService.scrollTop();
  };

  reset() {
    this.paginationUtils.reset();
  };
}
