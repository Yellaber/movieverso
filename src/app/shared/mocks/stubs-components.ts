import { Component, input } from '@angular/core';
import { Movie } from '@interfaces';

@Component({
  selector: 'carousel',
  template: `<li>StubCarousel</li>`
})
export class StubCarousel {
  totalCard = input.required<number>();
  widthCardContainer = input.required<number>();
  bgControl = input.required<string>();
};

@Component({
  selector: 'carousel-title',
  template: `<li>StubCarouselTitle</li>`
})
export class StubCarouselTitle {
  carouselTitle = input.required<string>();
  route = input.required<string>();
};

@Component({
  selector: 'poster-movie',
  template: `<li>StubPosterMovie</li>`
})
export class StubPosterMovie {
  movie = input.required<Movie>();
};

@Component({
  selector: 'footer-poster',
  template: `<li>StubFooterPoster</li>`
})
export class StubFooterPoster {
  movie = input.required<Movie>();
};

@Component({
  selector: 'control',
  template: `<li>StubControl</li>`
})
export class StubControl {
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

@Component({
  selector: 'filter-genre',
  template: '<li>StubFilterGenre</li>'
})
export class StubFilterGenre {
  genresIdSelected = input.required<string>();
};

@Component({
  selector: 'filter-sort-by',
  template: '<li>StubFilterSortBy</li>'
})
export class StubFilterSortBy {
  sortBy = input.required<string>();
};

@Component({
  selector: 'form-filter',
  template: '<li>StubFormFilter</li>'
})
export class StubFormFilter { };
