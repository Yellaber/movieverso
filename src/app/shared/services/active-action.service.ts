import { computed, Injectable, signal } from '@angular/core';

type ActiveAction = 'filter' | 'search';

@Injectable({
  providedIn: 'root'
})
export class ActiveActionService {
  private activeAction = signal<ActiveAction | undefined>(undefined);
  getActiveAction = computed(() => this.activeAction());

  set(activeAction: ActiveAction) {
    this.activeAction.set(activeAction);
  };
}
