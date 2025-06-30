import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { BannerUpcomingComponent } from './components/banner-upcoming/banner-upcoming.component';
import { SectionMovieComponent } from './components/section-movie/section-movie.component';
import { SeoFriendlyService, ScrollService } from '@services/';
import { SectionMovie } from '@interfaces/';


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
export default class HomeComponent implements OnInit, AfterViewInit {
  sections: SectionMovie[] = [];
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.scrollService.getScrollTop() > 0) {
      this.scrollService.saveScrollPosition('home');
    }
  };
  private seoFriendlyService = inject(SeoFriendlyService);
  private scrollService = inject(ScrollService);

  ngOnInit() {
    this.seoFriendlyService.setMetaTags('Inicio', 'Descubre películas de forma rápida y divertida en MovieVerso. Explora por nombre, género o popularidad y accede a información detallada de tus películas favoritas. ¡Tu universo de cine comienza aquí!');
    this.loadSections();
  }

  ngAfterViewInit() {
    this.scrollService.restoreScrollPosition('home');
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
