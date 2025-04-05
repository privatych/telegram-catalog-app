import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  features: string[];
  link: string;
}

interface CatalogState {
  apps: App[];
  selectedType: 'all' | 'channel' | 'bot' | 'app';
  setSelectedType: (type: 'all' | 'channel' | 'bot' | 'app') => void;
  addApp: (app: Omit<App, 'id'>) => void;
  removeApp: (id: string) => void;
  editApp: (id: string, app: Omit<App, 'id'>) => void;
}

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set) => ({
      apps: [
        {
          id: '1',
          name: 'Telegram Bot',
          description: 'A powerful bot for your Telegram channel',
          icon: '🤖',
          tags: ['bot', 'automation'],
          features: ['Command handling', 'Inline queries', 'Custom keyboards'],
          link: 'https://t.me/your_bot',
        },
        {
          id: '2',
          name: 'News Channel',
          description: 'Stay updated with the latest news',
          icon: '📰',
          tags: ['channel', 'news'],
          features: ['Daily updates', 'Breaking news', 'Categories'],
          link: 'https://t.me/your_channel',
        },
      ],
      selectedType: 'all',
      setSelectedType: (type) => set({ selectedType: type }),
      addApp: (app) => set((state) => ({
        apps: [...state.apps, { ...app, id: Date.now().toString() }],
      })),
      removeApp: (id) => set((state) => ({
        apps: state.apps.filter((app) => app.id !== id),
      })),
      editApp: (id, app) => set((state) => ({
        apps: state.apps.map((existingApp) => 
          existingApp.id === id ? { ...app, id } : existingApp
        ),
      })),
    }),
    {
      name: 'catalog-storage',
    }
  )
); 