import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RelatedMovie } from '@components/related-movie/related-movie';

@Component({
  selector: 'similars',
  imports: [ RelatedMovie ],
  template: `<related-movie type="similar"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Similars { }
