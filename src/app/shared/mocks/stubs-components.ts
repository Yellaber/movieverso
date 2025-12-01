import { Component, input } from '@angular/core';
import { Movie } from '@shared/interfaces';

@Component({
  selector: 'carousel-title',
  template: `<li>StubCarouselTitle</li>`
})
export class StubCarouselTitle {
  carouselTitle = input.required<string>();
  route = input.required<string>();
};

@Component({
  selector: 'carousel-card-movies',
  template: `<li>StubCarouselCardMovies</li>`
})
export class StubCarouselCardMovies {
  movie = input.required<Movie>();
  bgCardFooter = input.required<string>();
};

@Component({
  selector: 'carousel-control',
  template: `<li>StubCarouselControl</li>`
})
export class StubCarouselControl {
  direction = input.required<string>();
  bgButton = input.required<string>();
};

@Component({
  selector: 'navigation',
  template: '<li>StubNavigation</li>'
})
export class StubNavigation {
  menuItems = input.required<string[]>();
};

@Component({
  selector: 'rating',
  template: '<li>StubRating</li>'
})
export class StubRating {
  type = input.required<'popularity' | 'vote_average' | 'vote_count'>();
  value = input.required<number>();
};
