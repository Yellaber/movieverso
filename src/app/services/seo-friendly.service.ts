import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment.developments';

@Injectable({
  providedIn: 'root'
})
export class SeoFriendlyService {
  private title = inject(Title);
  private meta = inject(Meta);

  setMetaTags(titlePage: string, content: string, image?: string) {
    this.title.setTitle(environment.appName + ' - ' + titlePage);
    this.meta.updateTag({ name:'description', content });
    this.meta.updateTag({ name:'og:title', content: titlePage });
    if(image) {
      this.meta.updateTag({ name:'og:image', content: image });
    }
  }
}
