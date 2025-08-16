import { Component } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'stub-component',
  template: `<li>Stub Component</li>`
})
class StubComponentTesting {};

export const mockRoute: Route = { path: 'test', component: StubComponentTesting };
