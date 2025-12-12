import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ImageService } from '@services';
import { SlugifyUtils } from '@utils';
import { Movie } from '@interfaces';

@Component({
  selector: 'poster-movie',
  imports: [ NgOptimizedImage, RouterLink, TranslatePipe ],
  template: `
    @if(movie().id > 0) {
      <a [routerLink]="getMovieLink()">
        <img class="w-full h-full rounded-md bg-stone-700 object-cover object-center" [ngSrc]="getPosterImagePath()" [ngSrcset]="getPosterImageSrcset()" sizes="(min-width: 768px), 154px, 92px" width="154" height="231" [alt]="getPosterTitle()"/>
      </a>
    } @else {
      <div class="w-[92px] md:w-[154px] h-[138px] md:h-[231px] bg-yellow-800/80 text-yellow-600 font-semibold rounded-md shadow-md">
        <a class="flex w-full h-full justify-center items-center text-sm lg:text-xl" [routerLink]="movie().poster_path">{{ 'carouselLink' | translate }}</a>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'w-[92px] md:w-[154px]' }
})
export class PosterMovie {
  private imageService = inject(ImageService);
  movie = input.required<Movie>();
  getPosterImagePath = computed<string>(() => this.imageService.getPosterImagePath(this.movie()));
  getPosterImageSrcset = computed<string>(() => this.imageService.getPosterImageSrcset(this.movie()));
  getPosterTitle = computed<string>(() => this.imageService.getPosterTitle(this.movie()));
  getMovieLink = computed<string[]>(() => {
    const { id, title } = this.movie();
    const slug = SlugifyUtils.getSlug(title);
    return ['/movie', `${id}-${slug}`];
  });
}
