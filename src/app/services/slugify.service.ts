import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlugifyService {
  getSlug(title: string): string {
    return title.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
  }
}
