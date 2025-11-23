import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RelatedMovieComponent } from '@shared/components/related-movie/related-movie.component';

@Component({
  selector: 'similars',
  imports: [ RelatedMovieComponent ],
  template: `<related-movie type="similar"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SimilarsComponent { }
