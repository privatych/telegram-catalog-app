import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogStore } from '../store/catalogStore';
import { CatalogItem } from '../components/CatalogItem';

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
    <div className="min-h-screen bg-telegram-light p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-telegram-primary hover:text-telegram-secondary transition-colors"
          >
            <span className="mr-2">←</span>
            Вернуться в каталог
          </button>
        </div>

        <div className="bg-telegram-background rounded-lg shadow-card p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 flex-shrink-0 bg-telegram-surface
                            rounded-lg flex items-center justify-center">
                <span className="text-3xl">{app.icon}</span>
              </div>
              <div>
                <h1 className="text-2xl font-medium text-telegram-text">
                  {app.name}
                </h1>
                <p className="text-telegram-text-secondary mt-1">
                  {app.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => window.open(app.link, '_blank')}
              className="px-4 py-2 bg-telegram-primary text-white rounded-lg
                       hover:bg-telegram-secondary transition-colors"
            >
              Перейти в Telegram
            </button>
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

            <div className="pt-6 border-t border-telegram-light">
              <h2 className="text-lg font-medium text-telegram-text mb-4">
                Похожие приложения
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {apps
                  .filter((a) => a.id !== app.id)
                  .slice(0, 2)
                  .map((similarApp) => (
                    <CatalogItem key={similarApp.id} app={similarApp} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 