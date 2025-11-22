import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { environment } from '@environments/environment';
import { DetailMovieResponse } from '@shared/interfaces';

@Component({
  selector: 'card-detail',
  imports: [
    FontAwesomeModule,
    NgOptimizedImage
  ],
  template: `
    <div class="w-[160px] shadow-sm">
      <img class="w-full h-full object-cover object-center rounded-md" [ngSrc]="getPosterImage()" width="160" height="240"
      [alt]="movieDetail().title">
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
  getPosterImage = computed(() => {
    const posterPath = this.movieDetail().poster_path;
    return posterPath? environment.imageUrl + posterPath: '/images/no-poster.jpg';
  });
};
