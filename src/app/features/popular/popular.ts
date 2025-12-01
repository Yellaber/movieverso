import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Category } from '@components/category/category';

@Component({
  selector: 'popular',
  imports: [ Category ],
  template: `<category name="popular"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Popular { }
