import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoFriendlyService {
  private title = inject(Title);
  private meta = inject(Meta);

  setMetaTags(titlePage: string, content: string) {
    this.title.setTitle(titlePage);
    this.meta.updateTag({
      name:'description',
      content
    });
  }
}
