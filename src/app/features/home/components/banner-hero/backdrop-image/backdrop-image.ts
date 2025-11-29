import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'backdrop-image',
  imports: [ NgOptimizedImage ],
  template: `
    <img class="md:max-w-full object-cover object-center rounded-sm" [ngSrc]="backdropImagePath()"
    [ngSrcset]="backdropImageSrcset()" sizes="(min-width: 768px) 50vw, 80vw" width="640" height="360"
    [alt]="'Backdrop de '+title()"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden md:flex md:w-1/2 lg:w-1/3 md:justify-center mt-4 md:mt-0 md:ml-10 lg:ml-20 z-10' }
})
export class BackdropImage {
  title = input.required<string>();
  backdropImagePath = input.required<string>();
  backdropImageSrcset = input.required<string>();
}
