import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Logo } from '../logo/logo';

@Component({
  selector: 'arti-banner',
  imports: [Logo, RouterLink, MatButton],
  template: `<a routerLink="/" mat-button="text">
    <arti-logo matButtonIcon />
    <span>Artificer</span>
  </a>`,
  styles: `
    @use '@angular/material' as mat;
    :host {
      display: flex;
      height: 48px;
      padding-inline: 4px;
      background-color: var(--mat-sys-surface-container-lowest);
      align-items: center;
    }

    arti-logo {
      margin-inline-end: 8px;
    }

    a:has(arti-logo) {
      @include mat.button-overrides((
        text-label-text-color: var(--mat-sys-on-surface),
        text-label-text-size: var(--mat-sys-title-medium-size),
        text-label-text-weight: var(--mat-sys-title-medium-weight),
      ))
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'banner',
  },
})
export class Banner {}
