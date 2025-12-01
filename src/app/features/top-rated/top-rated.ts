import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Category } from '@components/category/category';

@Component({
  selector: 'top-rated',
  imports: [ Category ],
  template: `<category name="top-rated"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TopRatedComponent { }
