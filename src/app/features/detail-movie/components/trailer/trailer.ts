import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselTitle } from '@components/carousel-movies/carousel-title/carousel-title';
import { Notification } from '@components/notification/notification';
import { DetailService } from '@services';

@Component({
  selector: 'trailer',
  imports: [ CarouselTitle, Notification, TranslatePipe ],
  template: `
    <carousel-title carouselTitle="Trailer" route=""/>
    @if(movieTrailers.hasValue() && movieTrailers.value()[0]) {
      <div class="w-full max-w-3xl mx-auto aspect-video pt-5">
        <iframe class="w-full h-full" [src]="getSafeYoutubeUrl(movieTrailers.value()[0].key)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
        </iframe>
      </div>
    } @else {
      <notification [notificationTitle]="'detailMovie.movieList.trailer.notification.title' | translate"
      [message]="'detailMovie.movieList.trailer.notification.message' | translate"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Trailer {
  private detailService = inject(DetailService);
  private sanitizer = inject(DomSanitizer);
  movieId = input.required<number>();
  movieTrailers = rxResource({
    params: this.movieId,
    stream: ({ params }) => params? this.detailService.getMovieTrailers(params): of([])
  });

  getSafeYoutubeUrl(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`);
  };
}
