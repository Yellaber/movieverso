import { Injectable, signal } from '@angular/core';

type ActiveAction = 'filter' | 'search';

@Injectable({
  providedIn: 'root'
})
export class ActiveActionService {
  private activeAction = signal<ActiveAction | undefined>(undefined);

  set(activeAction: ActiveAction) {
    this.activeAction.set(activeAction);
  };

  get() {
    return this.activeAction.asReadonly();
  };
}
