import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryComponent } from '@shared/components/category/category.component';

@Component({
  selector: 'now-playing',
  imports: [ CategoryComponent ],
  template: `<category name="now-playing"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NowPlayingComponent { }
