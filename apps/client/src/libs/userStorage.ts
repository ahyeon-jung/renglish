import { REMEMBER_ME_EXPIRATION_TIME } from '@/constants/time';
import type { PersistStorage, StorageValue } from 'zustand/middleware';

export const createDynamicUserStorage = (): PersistStorage<any> => ({
  getItem: (name) => {
    const local = localStorage.getItem(name);
    const session = sessionStorage.getItem(name);

    const raw = local || session;
    if (!raw) return null;

    try {
      const parsed: StorageValue<any> & { expiresAt?: number } = JSON.parse(raw);

      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        localStorage.removeItem(name);
        sessionStorage.removeItem(name);
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    const rememberMe = value.state?.rememberMe;
    const serialized = JSON.stringify({
      ...value,
      expiresAt: rememberMe ? Date.now() + REMEMBER_ME_EXPIRATION_TIME : undefined,
    });

    if (rememberMe) {
      localStorage.setItem(name, serialized);
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.setItem(name, serialized);
      localStorage.removeItem(name);
    }
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
});