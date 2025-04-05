import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogStore } from '../store/catalogStore';

export const AppDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { apps } = useCatalogStore();
  const app = apps.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="min-h-screen bg-telegram-light p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-telegram-background rounded-lg shadow-card p-6">
            <h1 className="text-2xl font-medium text-telegram-text mb-4">
              Приложение не найдено
            </h1>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-telegram-primary text-white rounded-lg
                       hover:bg-telegram-secondary transition-colors"
            >
              Вернуться в каталог
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-telegram-text-secondary hover:text-telegram-primary transition-colors -ml-2 px-2 py-1"
      >
        <span className="mr-1">←</span>
        Назад
      </button>

      <div className="bg-telegram-background rounded-lg shadow-card p-4">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 flex-shrink-0 bg-telegram-surface
                        rounded-lg flex items-center justify-center">
            <span className="text-3xl">{app.icon}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-medium text-telegram-text mb-2">
              {app.name}
            </h1>
            <p className="text-telegram-text-secondary">
              {app.description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-telegram-text mb-3">
              Теги
            </h2>
            <div className="flex flex-wrap gap-2">
              {app.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-telegram-surface text-telegram-text-secondary
                           rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-telegram-text mb-3">
              Возможности
            </h2>
            <ul className="space-y-2">
              {app.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center text-telegram-text-secondary"
                >
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-telegram-light">
            <a
              href={app.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block text-center px-4 py-2 bg-telegram-primary text-white rounded-lg
                       hover:bg-telegram-secondary transition-colors"
            >
              Открыть в Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 