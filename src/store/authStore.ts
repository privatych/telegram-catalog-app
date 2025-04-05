import { create } from 'zustand';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { app } from '../firebase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  const auth = getAuth(app);

  // Слушаем изменения состояния аутентификации
  onAuthStateChanged(auth, (user) => {
    set({ user, isLoading: false });
  });

  return {
    user: null,
    isLoading: true,
    error: null,

    signIn: async (email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        set({ error: 'Invalid email or password' });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    signOut: async () => {
      set({ isLoading: true, error: null });
      try {
        await firebaseSignOut(auth);
        set({ user: null });
      } catch (error) {
        set({ error: 'Failed to sign out' });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    checkAuth: async () => {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          set({ user, isLoading: false });
          unsubscribe();
          resolve();
        });
      });
    }
  };
}); 