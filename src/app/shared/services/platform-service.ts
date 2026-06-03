import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly _isBrowser: boolean;

  constructor() {
    this._isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  isBrowser(): boolean {
    return this._isBrowser;
  }
}
