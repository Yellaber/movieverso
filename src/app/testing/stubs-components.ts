import { Component, input } from '@angular/core';
import { Movie } from '@shared/interfaces';

@Component({
  selector: 'carrusel-title',
  template: `<li>StubCarruselTitleComponent</li>`
})
export class StubCarruselTitleComponent {
  carruselTitle = input.required<string>();
  route = input.required<string>();
};

@Component({
  selector: 'carrusel-card-movies',
  template: `<li>StubCarruselCardMoviesComponent</li>`
})
export class StubCarruselCardMoviesComponent {
  movie = input.required<Movie>();
  bgCardFooter = input.required<string>();
};

@Component({
  selector: 'carrusel-control',
  template: `<li>StubCarruselControlComponent</li>`
})
export class StubCarruselControlComponent {
  direction = input.required<string>();
  bgButton = input.required<string>();
};

@Component({
  selector: 'navigation',
  template: '<li>StubNavigationComponent</li>'
})
export class StubNavigationComponent {
  menuItems = input.required<string[]>();
};

@Component({
  selector: 'rating',
  template: '<li>StubRatingComponent</li>'
})
export class StubRatingComponent {
  type = input.required<'popularity' | 'vote_average' | 'vote_count'>();
  value = input.required<number>();
};
