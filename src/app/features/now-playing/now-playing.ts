import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Category } from '@components/category/category';

@Component({
  selector: 'now-playing',
  imports: [ Category ],
  template: `<category name="now-playing"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NowPlaying { }
