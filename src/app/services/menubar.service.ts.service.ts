import { Injectable, Signal, signal } from '@angular/core';

type TypeAction = 'filter' | 'search';

@Injectable({
  providedIn: 'root'
})
export class MenubarService {
  private action = signal<TypeAction | undefined>(undefined);

  set(action: TypeAction) {
    this.action.set(action);
  };

  get(): Signal<TypeAction | undefined> {
    return this.action.asReadonly();
  };
}
