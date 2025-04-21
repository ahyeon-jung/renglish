import { createDynamicUserStorage } from '@/libs/userStorage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userId: string | null;
  rememberMe: boolean;
  setUserId: (id: string, rememberMe: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      rememberMe: false,
      setUserId: (id, rememberMe) =>
        set({
          userId: id,
          rememberMe,
        }),
      clearUser: () => set({ userId: null, rememberMe: false }),
    }),
    {
      name: 'user-store',
      storage: createDynamicUserStorage(),
      partialize: (state) => ({
        userId: state.userId,
        rememberMe: state.rememberMe,
      }),
    }
  )
);
