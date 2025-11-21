import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'backdrop-image',
  imports: [NgOptimizedImage],
  template: `
    <img class="w-full h-full md:object-cover md:object-center rounded-sm" [ngSrc]="getBackdropImageUrl()"
    [alt]="originalTitle()" width="640" height="360"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden md:flex md:w-1/2 justify-end rounded-md z-10' }
})
export class BackdropImageComponent {
  backdropPath = input.required<string>();
  originalTitle = input.required<string>();
  getBackdropImageUrl = computed<string>(() => {
    const backdropPath = this.backdropPath();
    return (backdropPath)? `${environment.imageUrl}${backdropPath}`: '/images/no-backdrop.jpg';
  });
};
