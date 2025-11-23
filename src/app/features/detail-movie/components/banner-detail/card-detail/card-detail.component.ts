import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { DetailMovieResponse } from '@shared/interfaces';

@Component({
  selector: 'card-detail',
  imports: [
    FontAwesomeModule,
    NgOptimizedImage
  ],
  template: `
    <div class="w-[160px] shadow-sm">
      @if(isPosterAvailable()) {
        <img class="w-full h-full object-cover object-center rounded-md" [ngSrc]="getPosterImagePath()"
        [ngSrcset]="getPosterImageSrcset()" sizes="160px" width="160" height="240" [alt]="movieDetail().title"/>
      } @else {
        <img class="w-full h-full object-cover object-center rounded-md" [src]="getPosterImagePath()"
        width="160" height="240" alt="imagen del poster no disponible"/>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden md:flex flex-col rounded-md z-10' }
})
export class CardDetailComponent {
  faBookmark = faBookmark;
  faHeart = faHeart;
  faThumbsUp = faThumbsUp;
  movieDetail = input.required<DetailMovieResponse>();
  posterImageSizes = [92, 154, 185, 342, 500, 780];
  isPosterAvailable = computed<boolean>(() => !!this.movieDetail().poster_path);
  getPosterImagePath = computed<string>(() =>
    this.isPosterAvailable()? this.movieDetail().poster_path: '/images/no-poster.jpg'
  );
  getPosterImageSrcset = computed<string>(() =>
    this.isPosterAvailable()? this.posterImageSizes.map((size) => `${size}w`).join(', '): ''
  );
}
