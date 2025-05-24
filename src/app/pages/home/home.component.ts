import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BannerUpcomingComponent } from '@components/banner-upcoming/banner-upcoming.component';
import { SectionMovieComponent } from '@components/section-movie/section-movie.component';
import { SeoFriendlyService } from '@services/seo-friendly.service';
import { SectionMovie } from '@interfaces/sectionMovie.interface';

@Component({
  imports: [
    BannerUpcomingComponent,
    SectionMovieComponent
  ],
  template: `
    @for(section of sections; track $index) {
      @if(section.heroType === 'upcoming') {
        <banner-upcoming [section]="section"/>
      } @else {
        <section-movie [section]="section"/>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent implements OnInit {
  sections: SectionMovie[] = [];
  private seoFriendlyService = inject(SeoFriendlyService);

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Inicio', 'Esta es la página de inicio');
    this.loadSections();
  }

  loadSections() {
    this.sections = [
      { heroType: 'upcoming', heroTitle: '', carruselTitle: 'Próximamente', route: '/proximamente' },
      { heroType: 'now_playing', heroTitle: 'Estrenos', carruselTitle: 'Top 20 - Estrenos',
        route: '/estrenos'},
      { heroType: 'popularity', heroTitle: 'Más popular', carruselTitle: 'Top 20 - Más populares',
        route: '/populares' },
      { heroType: 'rated', heroTitle: 'Más valorada', carruselTitle: 'Top 20 - Más valoradas',
        route: '/valoradas' },
      { heroType: 'trending', heroTitle: 'En tendencia', carruselTitle: 'Top 20 - En tendencia',
        route: '/tendencia' }
    ];
  }
}
