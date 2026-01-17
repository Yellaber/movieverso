import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SectionMovie } from './components/section-movie/section-movie';
import { SeoFriendlyService } from '@services';
import { DataSectionMovie, TypeTag } from '@interfaces';

@Component({
  selector: 'home',
  imports: [ SectionMovie, TranslatePipe ],
  template: `
    @for(section of sections(); track $index) {
      <section-movie [section]="section"/>
    }
    <div class="flex flex-col justify-center items-center gap-5 py-20">
      <h2 class="text-2xl lg:text-3xl text-yellow-600 font-bold">{{ 'home.title' | translate }}</h2>
      <p class="text-sm lg:text-xl text-center text-stone-300 font-semibold leading-relaxed md:px-7 lg:px-15">
        {{ 'home.paragraph' | translate }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Home implements OnInit, AfterViewInit {
  private seoFriendlyService = inject(SeoFriendlyService);
  private translateService = inject(TranslateService);
  sections = signal<DataSectionMovie[]>([]);

  ngOnInit() {
    this.loadTranslateMetaTags();
  }

  ngAfterViewInit() {
    this.loadTranslateSections();
  }

  private loadTranslateMetaTags() {
    this.translateService.get('home.metaTags').subscribe((metaTags: { title: string, description: string }) => {
      this.seoFriendlyService.setMetaTags(metaTags.title, metaTags.description);
    });
  }

  private loadTranslateSections() {
    const keys: string[] = [ 'home.nowPlayingSection', 'home.popularSection', 'home.topRatedSection', 'home.trendingSection' ];
    keys.forEach(key =>
      this.translateService.get(key).subscribe((section: { heroType: TypeTag, heroTitle: string, carouselTitle: string }) => {
        const { heroType, heroTitle, carouselTitle } = section;
        this.sections.update(sections => [ ...sections, { heroType, heroTitle, carouselTitle } ]);
      })
    );
  }
}
