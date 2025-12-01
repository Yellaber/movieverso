import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'notification',
  imports: [],
  template: `
    <span><strong>{{ notificationTitle() }}</strong> {{ message() }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex w-full text-xs md:text-sm bg-yellow-900/50 text-yellow-600 rounded-md gap-2 p-4 mb-4' }
})
export class Notification {
  notificationTitle = input.required<string>();
  message = input.required<string>();
}
