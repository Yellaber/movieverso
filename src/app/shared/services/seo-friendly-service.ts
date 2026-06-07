import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoFriendlyService {
  private title = inject(Title);
  private meta = inject(Meta);

  setMetaTags(titlePage: string, content: string, image?: string) {
    this.title.setTitle(`${environment.appName} - ${titlePage}`);
    this.meta.updateTag({ name: 'description', content });
    this.meta.updateTag({ property: 'og:title', content: titlePage });
    this.meta.updateTag({ property: 'og:description', content });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    if(image) {
      this.meta.updateTag({ property: 'og:image', content: image });
    }
  }
}
