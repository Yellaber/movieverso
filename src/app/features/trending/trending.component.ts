import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryComponent } from '@shared/components/category/category.component';

@Component({
  selector: 'trending',
  imports: [ CategoryComponent ],
  template: `<category name="trending"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TrendingComponent { }
