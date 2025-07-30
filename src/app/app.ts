import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'arti-root',
  template: `<arti-nx-welcome></arti-nx-welcome>
    <router-outlet></router-outlet>`,
  styles: ``,
})
export class App {
  protected title = 'artificer';
}
