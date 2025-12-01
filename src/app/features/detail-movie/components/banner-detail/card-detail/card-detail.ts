import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'card-detail',
  imports: [ FontAwesomeModule, NgOptimizedImage ],
  template: `
    <div class="w-[160px] shadow-sm">
      <img class="w-full h-full object-cover object-center rounded-md" [ngSrc]="posterImagePath()"
      [ngSrcset]="posterImageSrcset()" sizes="160px" width="160" height="240" [alt]="title()"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden md:flex flex-col rounded-md z-10' }
})
export class CardDetail {
  faBookmark = faBookmark;
  faHeart = faHeart;
  faThumbsUp = faThumbsUp;
  title = input.required<string>();
  posterImagePath = input.required<string>();
  posterImageSrcset = input.required<string>();
}
