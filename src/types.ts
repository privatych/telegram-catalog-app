export interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  features: string[];
  link: string;
}

export interface CatalogItem extends App {
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

export interface AppState extends UserPreferences {
  toggleDarkMode: () => void;
  toggleFavorite: (id: string) => void;
} 