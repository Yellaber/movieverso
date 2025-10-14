import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryComponent } from '@shared/components/category/category.component';

@Component({
  selector: 'top-rated',
  imports: [ CategoryComponent ],
  template: `<category name="top-rated"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TopRatedComponent { }
