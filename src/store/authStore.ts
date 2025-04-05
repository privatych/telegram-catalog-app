import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: async (username: string, password: string) => {
        // Здесь обычно был бы вызов API
        if (username === 'admin' && password === '3vPjoDvsoNGQ6FXIbHTHBkF5r7JRci23') {
          set({ isAuthenticated: true, token: 'dummy-token' });
          return true;
        }
        // Добавляем задержку 15 секунд при неверном пароле
        await new Promise(resolve => setTimeout(resolve, 15000));
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, token: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
); 