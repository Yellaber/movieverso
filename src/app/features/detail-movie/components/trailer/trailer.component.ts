import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { YouTubePlayer } from '@angular/youtube-player';
import { of } from 'rxjs';
import { CarruselTitleComponent } from '@shared/components/carrusel-movies/carrusel-title/carrusel-title.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'trailer',
  imports: [
    CarruselTitleComponent,
    YouTubePlayer,
    NotificationComponent
  ],
  template: `
    <carrusel-title carruselTitle="Trailer" route=""/>
    @if(movieTrailers.hasValue() && movieTrailers.value()[0]) {
      <div class="flex w-full justify-center">
        <youtube-player [videoId]="movieTrailers.value()[0].key" placeholderImageQuality="high"/>
      </div>
    } @else {
      <notification notificationTitle="Spoiler invisible." message="Nada por aquí, nada por allá… ni un solo avance que mostrar. ¡La película se está haciendo la difícil!"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailerComponent {
  private detailService = inject(DetailService);
  movieId = input.required<number>();

  movieTrailers = rxResource({
    request: this.movieId,
    loader: () => this.movieId()? this.detailService.getMovieTrailers(this.movieId()!): of([])
  });
}
