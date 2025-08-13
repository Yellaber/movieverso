import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private document = inject(DOCUMENT);

  isBrowser(): boolean {
    return !!this.document && typeof window !== 'undefined';
  };
}
