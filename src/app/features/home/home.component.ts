import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, inject, OnInit } from '@angular/core';
import { SectionMovieComponent } from './components/section-movie/section-movie.component';
import { SeoFriendlyService } from '@app/core/services';
import { ScrollService } from '@shared/services';
import { SectionMovie } from '@shared/interfaces';

@Component({
  selector: 'home',
  imports: [SectionMovieComponent],
  template: `
    @for(section of sections; track $index) {
      <section-movie [section]="section"/>
    }
    <div class="flex flex-col justify-center items-center gap-5 py-20">
      <h2 class="text-2xl lg:text-3xl text-yellow-600 font-bold">¿Nada interesante a la vista?</h2>
      <p class="text-sm lg:text-xl text-center text-stone-300 font-semibold leading-relaxed md:px-7 lg:px-15">
        Eso no significa que la película no exista, tal vez la joya que buscas está en algún universo
        paralelo. Prueba afinando la búsqueda con nuestro filtro avanzado. ¡Entre más detalles das, más
        preciso es el hallazgo! El universo es tuyo.
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent implements OnInit, AfterViewInit {
  private seoFriendlyService = inject(SeoFriendlyService);
  private scrollService = inject(ScrollService);
  sections: SectionMovie[] = [];
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.scrollService.getScrollTop() > 0) {
      this.scrollService.saveScrollPosition('home');
    }
  };

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
