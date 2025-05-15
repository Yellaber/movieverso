import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BannerUpcomingComponent } from '../../components/banner-upcoming/banner-upcoming.component';
import { SeoFriendlyService } from '../../services/seo-friendly/seo-friendly.service';
import { SectionMovie } from '../../interfaces/sectionMovie.interface';
import { SectionMovieComponent } from '../../components/section-movie/section-movie.component';

@Component({
  selector: 'home',
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
      {
        heroType: 'upcoming',
        heroTitle: '',
        carruselTitle: 'Próximamente',
        route: '/proximamente',
      },
      {
        heroType: 'now_playing',
        heroTitle: 'Estrenos',
        carruselTitle: 'Top 10 - Estrenos',
        route: '/estrenos',
      },
      {
        heroType: 'popularity',
        heroTitle: 'Más popular',
        carruselTitle: 'Top 10 - Más populares',
        route: '/populares',
      },
      {
        heroType: 'rated',
        heroTitle: 'Más valorada',
        carruselTitle: 'Top 10 - Más valoradas',
        route: '/valoradas',
      },
      {
        heroType: 'trending',
        heroTitle: 'En tendencia',
        carruselTitle: 'Top 10 - En tendencia',
        route: '/tendencia',
      }
    ];
  }
}
