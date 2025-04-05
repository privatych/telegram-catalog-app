import { create } from 'zustand';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  features: string[];
  category: 'bots' | 'channels' | 'apps';
  telegramLink: string;
}

interface CatalogState {
  apps: App[];
  selectedType: string | null;
  isLoading: boolean;
  error: string | null;
  loadApps: () => Promise<void>;
  addApp: (app: Omit<App, 'id'>) => Promise<void>;
  updateApp: (id: string, app: Partial<App>) => Promise<void>;
  deleteApp: (id: string) => Promise<void>;
  setSelectedType: (type: string | null) => void;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  apps: [],
  selectedType: null,
  isLoading: false,
  error: null,

  loadApps: async () => {
    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, 'apps'));
      const apps = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as App[];
      set({ apps, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load apps', isLoading: false });
      console.error('Error loading apps:', error);
    }
  },

  addApp: async (app) => {
    set({ isLoading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, 'apps'), app);
      const newApp = { ...app, id: docRef.id };
      set(state => ({
        apps: [...state.apps, newApp],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add app', isLoading: false });
      console.error('Error adding app:', error);
    }
  },

  updateApp: async (id, appUpdate) => {
    set({ isLoading: true, error: null });
    try {
      const docRef = doc(db, 'apps', id);
      await updateDoc(docRef, appUpdate);
      set(state => ({
        apps: state.apps.map(app => 
          app.id === id ? { ...app, ...appUpdate } : app
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update app', isLoading: false });
      console.error('Error updating app:', error);
    }
  },

  deleteApp: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteDoc(doc(db, 'apps', id));
      set(state => ({
        apps: state.apps.filter(app => app.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete app', isLoading: false });
      console.error('Error deleting app:', error);
    }
  },

  setSelectedType: (type) => set({ selectedType: type })
})); 