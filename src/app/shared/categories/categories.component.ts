import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NavigationComponent } from '@app/components/menubar/navigation/navigation.component';

@Component({
  selector: 'categories',
  imports: [NavigationComponent],
  template: `
    <div class="flex flex-col lg:flex-row lg:gap-5 pt-5">
      <span class="text-xs lg:text-sm text-stone-300 font-semibold">Universos paralelos que vale la pena explorar:</span>
      <navigation [menuItems]="menuItems()"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  menuItems = input.required<string[]>();
}
