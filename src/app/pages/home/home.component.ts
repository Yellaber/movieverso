import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, inject, OnInit } from '@angular/core';
import { SectionMovieComponent } from './components/section-movie/section-movie.component';
import { SeoFriendlyService, ScrollService } from '@services/';
import { SectionMovie } from '@interfaces/';

@Component({
  selector: 'home',
  imports: [SectionMovieComponent],
  template: `
    @for(section of sections; track $index) {
      <section-movie [section]="section"/>
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
  };

  ngAfterViewInit() {
    this.scrollService.restoreScrollPosition('home');
  };

  loadSections() {
    this.sections = [
      {heroType: 'now-playing', heroTitle: 'En cartelera', carruselTitle: 'Top 20 - En cartelera'},
      {heroType: 'popular', heroTitle: 'Más popular', carruselTitle: 'Top 20 - Más populares'},
      {heroType: 'top-rated', heroTitle: 'Mejor valorada', carruselTitle: 'Top 20 - Mejor valoradas'},
      {heroType: 'trending', heroTitle: 'En tendencia', carruselTitle: 'Top 20 - En tendencia',}
    ];
  };
}
