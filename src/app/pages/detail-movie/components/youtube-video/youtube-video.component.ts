import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { CarruselTitleComponent } from '@shared/carrusel-movies/carrusel-title/carrusel-title.component';
import { NotificationComponent } from '@shared/notification/notification.component';
import { Trailer } from '@interfaces/';

@Component({
  selector: 'youtube-video',
  imports: [
    CarruselTitleComponent,
    YouTubePlayer,
    NotificationComponent
  ],
  template: `
    <carrusel-title carruselTitle="Trailer" route=""/>
    @if(trailers() && trailers().length > 0) {
      <div class="flex w-full justify-center">
        <youtube-player [videoId]="getMovieKey()" placeholderImageQuality="high"/>
      </div>
    } @else {
      <notification notificationTitle="Spoiler invisible." message="Nada por aquí, nada por allá… ni un solo avance que mostrar. ¡La película se está haciendo la difícil!"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubeVideoComponent {
  trailers = input.required<Trailer[]>();

  getMovieKey(): string {
    return this.trailers()[0].key;
  };
}
