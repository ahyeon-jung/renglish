import { create } from 'zustand';

type UserState = {
  userId: string | null;
  setUserId: (id: string) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  clearUser: () => set({ userId: null }),
}));