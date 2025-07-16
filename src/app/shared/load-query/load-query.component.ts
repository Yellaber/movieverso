import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'load-query',
  imports: [],
  template: `<p>load-query works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadQueryComponent { }
