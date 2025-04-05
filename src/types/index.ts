export interface CatalogItem {
  id: string;
  type: 'channel' | 'bot' | 'mini-app';
  title: string;
  description: string;
  icon: string;
  link: string;
  category: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface UserPreferences {
  darkMode: boolean;
  favorites: string[];
} 