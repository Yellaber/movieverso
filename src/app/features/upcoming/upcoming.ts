import { Category } from '@components/category/category';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'upcoming',
  imports: [ Category ],
  template: `<category name="upcoming"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Upcoming { }
