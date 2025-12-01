import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselTitleSkeleton } from './carousel-title-skeleton/carousel-title-skeleton';
import { CardMovieSkeleton } from './card-movie-skeleton/card-movie-skeleton';

@Component({
  selector: 'carousel-movies-skeleton',
  imports: [ CarouselTitleSkeleton, CardMovieSkeleton ],
  templateUrl: './carousel-movies-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-5 py-7 lg:pt-10 lg:pb-15' }
})
export class CarouselMoviesSkeleton {
  cardsSkeleton = Array(10);
}
