import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Category } from '@components/category/category';

@Component({
  selector: 'trending',
  imports: [ Category ],
  template: `<category name="trending"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Trending { }
