import { inject, Injectable, DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private document = inject(DOCUMENT);

  isBrowser(): boolean {
    return !!this.document && typeof window !== 'undefined';
  }
}
