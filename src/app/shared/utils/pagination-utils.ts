import { computed, signal } from '@angular/core';

export class PaginationUtils {
  private page = signal<number>(1);
  getPage = computed(() => this.page());

  next() { this.page.update(value => value + 1); };

  reset() { this.page.set(1); };
}
