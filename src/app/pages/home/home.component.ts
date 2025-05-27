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
    this.seoFriendlyService.setMetaTags('Inicio', 'Descubre películas de forma rápida y divertida en MovieVerso. Explora por nombre, género o popularidad y accede a información detallada de tus películas favoritas. ¡Tu universo de cine comienza aquí!');
    this.loadSections();
  }

  loadSections() {
    this.sections = [
      { heroType: 'upcoming', heroTitle: '', carruselTitle: 'Próximamente', route: '/upcoming' },
      { heroType: 'now_playing', heroTitle: 'Estrenos', carruselTitle: 'Top 20 - Estrenos',
        route: '/now-playing'},
      { heroType: 'popularity', heroTitle: 'Más popular', carruselTitle: 'Top 20 - Más populares',
        route: '/populars' },
      { heroType: 'rated', heroTitle: 'Más valorada', carruselTitle: 'Top 20 - Más valoradas',
        route: '/top-rated' },
      { heroType: 'trending', heroTitle: 'En tendencia', carruselTitle: 'Top 20 - En tendencia',
        route: '/trending' }
    ];
  }
}
