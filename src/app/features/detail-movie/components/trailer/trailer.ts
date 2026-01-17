import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselTitle } from '@components/carousel-movies/carousel-title/carousel-title';
import { Notification } from '@components/notification/notification';
import { IframeVideo } from "./iframe-video/iframe-video";
import { DetailService } from '@services';

@Component({
  selector: 'trailer',
  imports: [ CarouselTitle, IframeVideo, Notification, TranslatePipe ],
  template: `
    <carousel-title carouselTitle="Trailer"/>
    @if(movieTrailers.hasValue() && movieTrailers.value()) {
      <iframe-video [videoKey]="movieTrailers.value()[0].key"/>
    } @else {
      <notification [notificationTitle]="'detailMovie.movieList.trailer.notification.title' | translate"
      [message]="'detailMovie.movieList.trailer.notification.message' | translate"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Trailer {
  private detailService = inject(DetailService);
  movieId = input.required<number>();
  movieTrailers = rxResource({
    params: this.movieId,
    stream: ({ params }) => params? this.detailService.getMovieTrailers(params): of([])
  });
}
