import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CarruselTitleComponent } from '@shared/components/carrusel-movies/carrusel-title/carrusel-title.component';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'trailer',
  imports: [
    CarruselTitleComponent,
    NotificationComponent
  ],
  template: `
    <carrusel-title carruselTitle="Trailer" route=""/>
    @if(movieTrailers.hasValue() && movieTrailers.value()[0]) {
      <div class="w-full max-w-3xl mx-auto aspect-video pt-5">
        <iframe class="w-full h-full" [src]="getSafeYoutubeUrl(movieTrailers.value()[0].key)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
        </iframe>
      </div>
    } @else {
      <notification notificationTitle="Spoiler invisible." message="Nada por aquí, nada por allá… ni un solo avance que mostrar. ¡La película se está haciendo la difícil!"/>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailerComponent {
  private detailService = inject(DetailService);
  private sanitizer = inject(DomSanitizer);
  movieId = input.required<number>();

  movieTrailers = rxResource({
    request: this.movieId,
    loader: () => this.movieId()? this.detailService.getMovieTrailers(this.movieId()!): of([])
  });

  getSafeYoutubeUrl(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`);
  }
}
