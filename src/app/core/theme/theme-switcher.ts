import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { ThemeManager } from './theme-manager';

export const SELECTOR = 'arti-theme-switcher';

@Component({
  selector: SELECTOR,
  imports: [MatIcon, MatMenuTrigger, MatMenu, MatMenuItem, MatIconButton],
  template: `<button
      type="button"
      mat-icon-button
      [matMenuTriggerFor]="themeMenu"
      aria-label="Open theme picker"
    >
      <mat-icon>
        @switch(theme()) { @case('light'){ light_mode } @case('dark'){ dark_mode
        } @default { routine } }
      </mat-icon>
    </button>
    <mat-menu #themeMenu>
      <button
        type="button"
        mat-menu-item
        aria-label="Set default system theme"
        (click)="theme.set('normal')"
      >
        <mat-icon>routine</mat-icon><span>System</span>
      </button>
      <button
        type="button"
        mat-menu-item
        aria-label="Set light theme"
        (click)="theme.set('light')"
      >
        <mat-icon>light_mode</mat-icon><span>Light</span>
      </button>
      <button
        type="button"
        mat-menu-item
        aria-label="Set dark theme"
        (click)="theme.set('dark')"
      >
        <mat-icon>dark_mode</mat-icon><span>Dark</span>
      </button>
    </mat-menu>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcher {
  protected theme = inject(ThemeManager).theme;
}
