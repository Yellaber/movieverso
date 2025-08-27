import { computed, Injectable, signal } from '@angular/core';

type ActiveAction = 'filter' | 'search' | 'none';

@Injectable({
  providedIn: 'root'
})
export class ActiveActionService {
  private activeAction = signal<ActiveAction>('none');
  getActiveAction = computed(() => this.activeAction());

  set(activeAction: ActiveAction) {
    this.activeAction.set(activeAction);
  };
};
