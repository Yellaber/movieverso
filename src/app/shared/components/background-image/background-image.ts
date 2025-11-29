import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'background-image',
  imports: [ NgOptimizedImage ],
  template: `
    <img class="absolute w-full h-full object-cover object-center" [ngSrc]="backdropImagePath()"
    [ngSrcset]="backdropImageSrcset()" sizes="100vw" [alt]="title()" fill priority/>
    <div class="absolute inset-0 bg-stone-900/80"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundImage {
  title = input.required<string>();
  backdropImagePath = input.required<string>();
  backdropImageSrcset = input.required<string>();
}
