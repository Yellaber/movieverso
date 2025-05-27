import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { CarruselTitleComponent } from '@shared/carrusel-movies/carrusel-title/carrusel-title.component';

@Component({
  selector: 'youtube-video',
  imports: [ YouTubePlayer, CarruselTitleComponent ],
  template: `
    <carrusel-title carruselTitle="Trailer" route=""/>
    <div class="flex w-full justify-center">
      <youtube-player [videoId]="idVideo()" placeholderImageQuality="high"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubeVideoComponent {
  idVideo = input.required<string>();
}
