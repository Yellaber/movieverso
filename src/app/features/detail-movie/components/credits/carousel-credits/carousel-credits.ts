import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Carousel } from '@components/carousel/carousel';
import { ImageService } from '@services';
import { Cast, MovieCredit } from '@interfaces';

@Component({
  selector: 'carousel-credits',
  imports: [ Carousel, NgOptimizedImage ],
  template: `
    <carousel [totalCards]="getTotalCast()" [widthCardContainer]="getWidthCardContainer()" bgControl="from-stone-800">
      @for(cast of credit().cast; track cast.id) {
        <div class="flex shrink-0 md:w-56 lg:w-64 items-center rounded-md bg-stone-700 gap-4 pr-3" #card>
          <div class='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden'>
            <img class="w-full h-full object-cover object-center rounded-l-md" [ngSrc]="getProfileImagePath(cast)" [ngSrcset]="getProfileImageSrcset(cast)" sizes="64px" width="64" height="96" [alt]="getProfileName(cast)">
          </div>
          <div class="flex flex-col justify-center w-full text-nowrap overflow-hidden">
            <span class="text-xs lg:text-sm text-yellow-600 font-semibold truncate">{{ cast.original_name }}</span>
            <span class="text-xs lg:text-sm text-stone-300 truncate">{{ cast.character }}</span>
          </div>
        </div>
      }
    </carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselCredits {
  private imageService = inject(ImageService);
  credit = input.required<MovieCredit>();
  cardContainer = viewChild<ElementRef<HTMLDivElement>>('card');
  getTotalCast = computed<number>(() => this.credit().cast.length);
  getWidthCardContainer = computed<number>(() => {
    const cardContainer = this.cardContainer();
    return cardContainer? cardContainer.nativeElement.offsetWidth: 0
  });

  getProfileImagePath(cast: Cast): string {
    return this.imageService.getProfileImagePath(cast)
  };

  getProfileImageSrcset(cast: Cast): string {
    return this.imageService.getProfileImageSrcset(cast);
  };

  getProfileName(cast: Cast): string {
    return this.imageService.getProfileName(cast);
  };
}
