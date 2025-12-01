import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RelatedMovie } from '@components/related-movie/related-movie';

@Component({
  selector: 'recommendations',
  imports: [ RelatedMovie ],
  template: `<related-movie type="recommendations"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecommendationsComponent { }
