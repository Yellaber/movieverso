import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'content-category',
  imports: [],
  template: `
    <div class="flex flex-col gap-5 mt-10 lg:mt-15">
      <h3 class="text-sm lg:text-xl font-bold rounded-full text-yellow-600 gap-2">
        {{ title() }}
      </h3>
      <p class="text-xs lg:text-sm text-stone-300 leading-relaxed">
        {{ paragraph() }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentCategory implements OnInit {
  private translateService = inject(TranslateService);
  title = model.required<string>();
  paragraph = model.required<string>();

  ngOnInit() {
    this.loadTranslations();
  }

  private loadTranslations() {
    this.translateService.get(this.title()).subscribe((title: string) => this.title.set(title));
    this.translateService.get(this.paragraph()).subscribe((paragraph: string) => this.paragraph.set(paragraph));
  }
}
