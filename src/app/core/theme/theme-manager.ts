import { isPlatformBrowser } from '@angular/common';
import {
  afterRenderEffect,
  DOCUMENT,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { LOCAL_STORAGE } from '../providers/local-storage';

type Theme = 'normal' | 'light' | 'dark';

// needs to be kept in sync with the index.html page
// TODO - can we share this with the page
const THEME_PREFERENCE_STORAGE_KEY = 'themePreference';

@Injectable({
  providedIn: 'root',
})
export class ThemeManager {
  private readonly _document = inject(DOCUMENT);
  private readonly _localStorage = inject(LOCAL_STORAGE);
  private readonly _platformId = inject(PLATFORM_ID);

  readonly theme = signal<Theme>(
    (this._localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY) as Theme) ??
      'normal'
  );

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      afterRenderEffect({
        write: () => {
          const theme = this.theme();
          this._document.documentElement.style.colorScheme = theme;
        },
      });

      effect(() => {
        const theme = this.theme();
        this._localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, theme);
      });

      this._document.defaultView
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          const preferredScheme = event.matches ? 'dark' : 'light';
          this.theme.set(preferredScheme);
        });
    }
  }
}
