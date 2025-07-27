import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="flex flex-col md:flex-row justify-center items-center text-stone-400 gap-2 md:gap-5 p-5">
      <span class="text-xs lg:text-sm">&copy; 2025-MovieVerso</span>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { }
