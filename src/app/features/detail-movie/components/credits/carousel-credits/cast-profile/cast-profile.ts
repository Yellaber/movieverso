import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ImageService } from '@services';
import { Cast } from '@interfaces';

@Component({
  selector: 'cast-profile',
  imports: [ NgOptimizedImage ],
  template: `
    <div class='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden'>
      <img class="w-full h-full object-cover object-center rounded-l-md" [ngSrc]="getProfileImagePath()" [ngSrcset]="getProfileImageSrcset()"
      sizes="(min-width: 1024px) 96px, (min-width: 768px) 80px, 64px" width="64" height="96" [alt]="getProfileName()">
    </div>
    <div class="flex flex-col justify-center w-full text-nowrap overflow-hidden">
      <span class="text-xs lg:text-sm text-yellow-600 font-semibold truncate">{{ cast().original_name }}</span>
      <span class="text-xs lg:text-sm text-stone-300 truncate">{{ cast().character }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex shrink-0 w-48 md:w-56 lg:w-64 items-center rounded-md bg-stone-700 gap-4 pr-3' }
})
export class CastProfile {
  private imageService = inject(ImageService);
  cast = input.required<Cast>();
  getProfileImagePath = computed<string>(() => this.imageService.getProfileImagePath(this.cast()));
  getProfileImageSrcset = computed<string>(() => this.imageService.getProfileImageSrcset(this.cast()));
  getProfileName = computed<string>(() => this.imageService.getProfileName(this.cast()));
}
