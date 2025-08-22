/* eslint-disable @typescript-eslint/no-empty-function */

import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LOCAL_STORAGE', {
  providedIn: 'root',
  factory: () => createSafeLocalStorage(),
});

const safeStorage: Storage = {
  get length() {
    return 0;
  },
  clear() {},
  getItem() {
    return null;
  },
  key() {
    return null;
  },
  removeItem() {},
  setItem() {},
};

/**
 * Creates a safe wrapper around the browser's localStorage.
 * If localStorage is inaccessible (e.g., due to browser security settings),
 * returns a fallback Storage implementation that safely handles all operations.
 * This prevents runtime errors when accessing localStorage in restricted environments.
 */
function createSafeLocalStorage(): Storage {
  try {
    const raw = localStorage;
    return new Proxy(raw, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
          return function (...args: unknown[]) {
            try {
              return value.apply(target, args);
            } catch {
              const fallback = safeStorage[prop as keyof Storage];
              return fallback.apply(safeStorage, args);
            }
          };
        }
        return value;
      },
    });
  } catch {
    return safeStorage;
  }
}
