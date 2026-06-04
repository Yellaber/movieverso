import { inject, Injectable, DOCUMENT } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PlatformService } from './platform-service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private platformService = inject(PlatformService);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private cacheScroll = new Map<string, number>();
  private currentUrl = '';

  isAtBottom(offset: number = 300): boolean {
    if(this.platformService.isBrowser()) {
      const { scrollTop, clientHeight, scrollHeight } = this.document.documentElement;
      return scrollTop + clientHeight + offset >= scrollHeight;
    }
    return false;
  }

  private setScrollTo(top: number, behavior: ScrollBehavior = 'auto') {
    this.document.documentElement.scrollTo({ top, behavior });
  }

  getScrollTop(): number {
    return this.platformService.isBrowser()? this.document.documentElement.scrollTop: 0;
  }

  scrollTop(behavior: ScrollBehavior = 'auto') {
    if(this.platformService.isBrowser()) {
      this.setScrollTo(0, behavior);
    }
  }

  saveScrollPosition(key: string) {
    const scrollPosition = this.getScrollTop();
    this.cacheScroll.set(key, scrollPosition);
  }

  restoreScrollPosition(key: string, behavior: ScrollBehavior = 'auto') {
    if(this.platformService.isBrowser()) {
      const scrollPosition = this.cacheScroll.get(key);
      if(scrollPosition) {
        this.setScrollTo(scrollPosition, behavior);
      }
    }
  }

  initScrollTracking() {
    this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe((e) => {
      const event = e as NavigationStart;
      if(this.platformService.isBrowser()) {
        this.saveScrollPosition(this.currentUrl);
      }
      this.currentUrl = event.url;
    });

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e) => {
      const event = e as NavigationEnd;
      setTimeout(() => {
        const saved = this.cacheScroll.get(event.urlAfterRedirects);
        saved ? this.restoreScrollPosition(event.urlAfterRedirects) : this.scrollTop();
      }, 0);
    });
  }

  blockWindow(isBlocked: boolean) {
    if(this.platformService.isBrowser()) {
      isBlocked? this.document.querySelector('body')?.classList.add('overflow-hidden'):
      this.document.querySelector('body')?.classList.remove('overflow-hidden');
    }
  }
}
