import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { ThemeManager } from './theme-manager';
import { ThemeSwitcher } from './theme-switcher';

describe('ThemeSwitcher', () => {
  const mockThemeManager = {
    theme: signal('normal'),
  };

  const iconThemeMap = {
    routine: 'normal',
    light_mode: 'light',
    dark_mode: 'dark',
  };

  beforeEach(async () => {
    await render(ThemeSwitcher, {
      providers: [
        {
          provide: ThemeManager,
          useValue: mockThemeManager,
        },
      ],
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should update the theme when a menu item is selected', () => {
    const trigger: HTMLButtonElement = screen.getByRole('button', {
      name: 'Open theme picker',
    });
    trigger.click();

    const menuItems = screen.getAllByRole('menuitem');

    // ensure the query returns more than one item
    expect(menuItems.length).toBeGreaterThan(0);

    const setterSpy = vi.spyOn(mockThemeManager.theme, 'set');
    menuItems.forEach((item) => {
      const icon = (item.querySelector('mat-icon') as HTMLElement).textContent;
      item.click();
      expect(setterSpy).toHaveBeenCalledWith(iconThemeMap[icon]);
    });
  });

  it('should set icon when theme changes', () => {
    const trigger: HTMLButtonElement = screen.getByRole('button', {
      name: 'Open theme picker',
    });

    trigger.click();

    const menuItems = screen.getAllByRole('menuitem');

    // ensure the query returns more than one item
    expect(menuItems.length).toBeGreaterThan(0);

    menuItems.forEach((item) => {
      const icon = (item.querySelector('mat-icon') as HTMLElement).textContent;
      item.click();
      TestBed.tick();

      expect(trigger.querySelector('mat-icon')).toHaveTextContent(icon, {
        normalizeWhitespace: true,
      });
    });
  });
});
