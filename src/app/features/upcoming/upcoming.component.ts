import { CategoryComponent } from '@shared/components/category/category.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'upcoming',
  imports: [ CategoryComponent ],
  template: `<category name="upcoming"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UpcomingComponent { }
