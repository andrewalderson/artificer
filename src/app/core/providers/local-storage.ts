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

function createSafeLocalStorage(): Storage {
  try {
    // Accessing localStorage may throw
    const raw = localStorage;
    return new Proxy(raw, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (value instanceof Function) {
          return (...args: unknown[]) => {
            try {
              return value.apply(target, args);
            } catch {
              switch (prop) {
                case 'getItem':
                case 'key':
                  return null;
                case 'length':
                  return 0;
                default:
                  return undefined;
              }
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
