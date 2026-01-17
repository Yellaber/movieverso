import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'card-detail',
  imports: [ NgOptimizedImage ],
  template: `
    @if(title() && posterImagePath() && posterImageSrcset()) {
      <div class="w-[154px] shadow-sm">
        <img class="w-full h-full object-cover object-center rounded-md" [ngSrc]="posterImagePath()" [ngSrcset]="posterImageSrcset()" sizes="154px" width="154" height="231" [alt]="title()"/>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden md:flex flex-col z-10' }
})
export class CardDetail {
  title = input.required<string>();
  posterImagePath = input.required<string>();
  posterImageSrcset = input.required<string>();
}
