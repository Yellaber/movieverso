import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'categories',
  imports: [
    NavigationComponent,
    TranslatePipe
  ],
  template: `
    <div class="flex flex-col lg:flex-row lg:gap-5 pt-5">
      <span class="text-xs lg:text-sm text-stone-300 font-semibold">{{ 'categories.text' | translate }}</span>
      <navigation [menuItems]="menuItems()"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  menuItems = input.required<string[]>();
}
