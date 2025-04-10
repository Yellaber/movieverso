import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'list',
  imports: [],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListComponent { }
