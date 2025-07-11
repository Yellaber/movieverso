import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private platform = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private cacheScroll = new Map<string, number>();

  isAtBottom(offset: number = 300): boolean {
    if(isPlatformBrowser(this.platform)) {
      const scrollTop = this.document.documentElement.scrollTop;
      const clientHeight = this.document.documentElement.clientHeight;
      const scrollHeight = this.document.documentElement.scrollHeight;
      return scrollTop + clientHeight + offset >= scrollHeight;
    }
      return false;
  };

  setScrollTo(top: number, behavior: ScrollBehavior = 'auto') {
    if(isPlatformBrowser(this.platform)) {
      this.document.documentElement.scrollTo({top, behavior});
    }
  };

  getScrollTop(): number {
    return isPlatformBrowser(this.platform)? this.document.documentElement.scrollTop: 0;
  };

  scrollTop(behavior: ScrollBehavior = 'auto') {
    this.setScrollTo(0, behavior);
  };

  saveScrollPosition(key: string) {
    if(isPlatformBrowser(this.platform)) {
      const scrollPosition = this.getScrollTop();
      this.cacheScroll.set(key, scrollPosition);
    }
  };

  restoreScrollPosition(key: string, behavior: ScrollBehavior = 'auto') {
    if(isPlatformBrowser(this.platform)) {
      const scrollPosition = this.cacheScroll.get(key);
      if(scrollPosition) {
        this.setScrollTo(scrollPosition, behavior);
      }
    }
  };
}
