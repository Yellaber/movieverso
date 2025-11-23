import { inject, Injectable, DOCUMENT } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private platformService = inject(PlatformService);
  private document = inject(DOCUMENT);
  private cacheScroll = new Map<string, number>();

  isAtBottom(offset: number = 300): boolean {
    if(this.platformService.isBrowser()) {
      const { scrollTop, clientHeight, scrollHeight } = this.document.documentElement;
      return scrollTop + clientHeight + offset >= scrollHeight;
    }
    return false;
  };

  private setScrollTo(top: number, behavior: ScrollBehavior = 'auto') {
    this.document.documentElement.scrollTo({ top, behavior });
  };

  getScrollTop(): number {
    return this.platformService.isBrowser()? this.document.documentElement.scrollTop: 0;
  };

  scrollTop(behavior: ScrollBehavior = 'auto') {
    if(this.platformService.isBrowser()) {
      this.setScrollTo(0, behavior);
    }
  };

  saveScrollPosition(key: string) {
    const scrollPosition = this.getScrollTop();
    this.cacheScroll.set(key, scrollPosition);
  };

  restoreScrollPosition(key: string, behavior: ScrollBehavior = 'auto') {
    if(this.platformService.isBrowser()) {
      const scrollPosition = this.cacheScroll.get(key);
      if(scrollPosition) {
        this.setScrollTo(scrollPosition, behavior);
      }
    }
  };

  blockWindow(isBlocked: boolean) {
    if(this.platformService.isBrowser()) {
      isBlocked? this.document.querySelector('body')?.classList.add('overflow-hidden'):
      this.document.querySelector('body')?.classList.remove('overflow-hidden');
    }
  };
};
