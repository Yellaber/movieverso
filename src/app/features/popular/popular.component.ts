import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryComponent } from '@shared/components/category/category.component';

@Component({
  selector: 'popular',
  imports: [ CategoryComponent ],
  template: `<category name="popular"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PopularComponent { }
