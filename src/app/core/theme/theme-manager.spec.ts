import { TestBed } from '@angular/core/testing';

import { LOCAL_STORAGE } from '../providers/local-storage';
import { ThemeManager } from './theme-manager';

describe('ThemeManager', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };

  const mediaQueryListMock = {
    matches: vi.fn().mockReturnValue(false),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeManager,
        { provide: LOCAL_STORAGE, useValue: localStorageMock },
      ],
    });

    vi.stubGlobal('matchMedia', () => mediaQueryListMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should set initial theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    const themeManager = TestBed.inject(ThemeManager);

    expect(themeManager.theme()).toBe('dark');
  });

  it('should set initial theme to normal if localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);
    const themeManager = TestBed.inject(ThemeManager);

    expect(themeManager.theme()).toBe('normal');
  });

  it('should update localStorage when theme changes', () => {
    const themeManager = TestBed.inject(ThemeManager);

    themeManager.theme.set('light');
    TestBed.tick();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'themePreference',
      'light'
    );

    themeManager.theme.set('dark');
    TestBed.tick();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'themePreference',
      'dark'
    );
  });

  it('should listen to system theme changes and update theme accordingly', () => {
    const themeManager = TestBed.inject(ThemeManager);
    const listener = mediaQueryListMock.addEventListener.mock.calls[0][1];

    const changeEvent = { matches: true }; // Simulate dark mode
    listener(changeEvent);

    expect(themeManager.theme()).toBe('dark');

    changeEvent.matches = false; // Simulate light mode
    listener(changeEvent);

    expect(themeManager.theme()).toBe('light');
  });

  it('should update document color scheme on theme change', () => {
    const themeManager = TestBed.inject(ThemeManager);

    themeManager.theme.set('dark');
    TestBed.tick();

    expect(document.documentElement.style.colorScheme).toBe('dark');

    themeManager.theme.set('light');
    TestBed.tick();

    expect(document.documentElement.style.colorScheme).toBe('light');
  });
});
