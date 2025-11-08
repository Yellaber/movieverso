import { ChangeDetectionStrategy, Component, computed, HostListener, OnInit, ResourceRef, inject, input, effect } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarruselCardMoviesComponent } from '@shared/components/carrusel-movies/carrusel-card-movies/carrusel-card-movies.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { CardMovieSkeletonComponent } from '@shared/components/carrusel-movies-skeleton/card-movie-skeleton/card-movie-skeleton.component';
import { ScrollService } from '@shared/services';
import { InfiniteScrollService } from './services/infinite-scroll.service';
import { Movie, MovieResponse } from '@shared/interfaces';

@Component({
  selector: 'infinite-scroll',
  imports: [
    CarruselCardMoviesComponent,
    NotificationComponent,
    CardMovieSkeletonComponent,
    TranslatePipe
  ],
  providers: [ InfiniteScrollService ],
  template: `
    <div class="flex flex-wrap justify-evenly gap-5 mb-5 lg:mb-10">
      @if(!moviesResponse().isLoading()) {
        @for(movie of movies(); track movie.id) {
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
export class InfiniteScrollComponent implements OnInit {
  private scrollService = inject(ScrollService);
  private infiniteScrollService = inject(InfiniteScrollService);
  cardMoviesSkeleton = Array(20);
  getPage = computed(() => this.infiniteScrollService.getPage());
  moviesResponse = input.required<ResourceRef<MovieResponse[] | undefined>>();
  movies = computed<Movie[]>(() => {
    const responses = this.moviesResponse().value();
    return responses? responses.flatMap(response => response.results): [];
  });
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.scrollService.isAtBottom() && !this.moviesResponse().isLoading()) {
      this.infiniteScrollService.nextPage();
    }
  };

  constructor() {
    effect(() => {
      const response = this.moviesResponse();
      if(response && response.hasValue()) {
        this.infiniteScrollService.setMoviesResponse(response.value());
      }
    });
  };

  ngOnInit() {
    this.scrollService.scrollTop();
  };

  reset() {
    this.infiniteScrollService.reset();
  };
};
