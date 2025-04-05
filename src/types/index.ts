export interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  tags: string[];
  category: 'bots' | 'channels' | 'apps';
  telegramLink: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  tags: string[];
  category: 'bots' | 'channels' | 'apps';
  telegramLink: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
}

export interface AppState {
  apps: App[];
  categories: Category[];
  selectedCategory: string | null;
  userPreferences: UserPreferences;
  favorites: string[];
  toggleFavorite: (id: string) => void;
} 