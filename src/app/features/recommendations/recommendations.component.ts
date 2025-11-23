import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RelatedMovieComponent } from '@shared/components/related-movie/related-movie.component';

@Component({
  selector: 'recommendations',
  imports: [ RelatedMovieComponent ],
  template: `<related-movie type="recommendations"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecommendationsComponent { }
