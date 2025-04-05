import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Неверные учетные данные');
    }
  };

  return (
    <div className="min-h-screen bg-telegram-light flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-telegram-background rounded-lg shadow-card p-6">
        <h1 className="text-2xl font-medium text-telegram-text mb-6 text-center">
          Вход в админ-панель
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-telegram-text-secondary mb-1">
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-telegram-light rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-telegram-primary
                       text-telegram-text"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-telegram-text-secondary mb-1">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-telegram-light rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-telegram-primary
                       text-telegram-text"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-telegram-primary text-white rounded-lg
                     hover:bg-telegram-secondary transition-colors"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}; 