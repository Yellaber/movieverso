import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CarouselCacheService {
  private cache = new Map<string, number>();

  savePosition(key: string, step: number) {
    this.cache.set(key, step);
  }

  getPosition(key: string): number | undefined {
    return this.cache.get(key);
  }
}
