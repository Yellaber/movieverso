import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'new',
  imports: [],
  templateUrl: './new.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NewComponent { }
