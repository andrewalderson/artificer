import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Banner } from './core/layout/banner/banner';

@Component({
  imports: [RouterModule, Banner],
  selector: 'arti-root',
  template: `<arti-banner /><router-outlet></router-outlet>`,
  styles: `
  :host {
    display: block;
    position: relative;
  }
  arti-banner {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  `,
})
export class App {}
