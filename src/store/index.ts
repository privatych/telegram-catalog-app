import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from '../types';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      apps: [],
      categories: [],
      selectedCategory: null,
      userPreferences: {
        theme: 'light',
        language: 'ru'
      },
      favorites: [],
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