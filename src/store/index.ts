import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserPreferences } from '../types';

interface AppState extends UserPreferences {
  toggleDarkMode: () => void;
  toggleFavorite: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      favorites: [],
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleFavorite: (id: string) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favoriteId) => favoriteId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: 'telegram-catalog-storage',
    }
  )
); 