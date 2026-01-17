import { ChangeDetectionStrategy, Component, computed, ElementRef, input, viewChild } from '@angular/core';
import { Carousel } from '@components/carousel/carousel';
import { MovieCredit } from '@interfaces';
import { CastProfile } from './cast-profile/cast-profile';

@Component({
  selector: 'carousel-credits',
  imports: [ Carousel, CastProfile ],
  template: `
    <carousel [totalCards]="getTotalCast()" [widthCardContainer]="getWidthCardContainer()" bgControl="from-stone-800">
      @for(cast of credit().cast; track cast.id) {
        <section #cast_profile>
          <cast-profile [cast]="cast"/>
        </section>
      }
    </carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselCredits {
  credit = input.required<MovieCredit>();
  cardContainer = viewChild<ElementRef<HTMLDivElement>>('cast_profile');
  getTotalCast = computed<number>(() => this.credit().cast.length);
  getWidthCardContainer = computed<number>(() => {
    const cardContainer = this.cardContainer();
    return cardContainer? cardContainer.nativeElement.offsetWidth: 0
  });
}
