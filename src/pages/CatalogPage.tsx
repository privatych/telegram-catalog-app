import React from 'react';
import { useCatalogStore } from '../store/catalogStore';
import { CatalogItem } from '../components/CatalogItem';

export const CatalogPage: React.FC = () => {
  const { apps, selectedType, setSelectedType } = useCatalogStore();

  const filteredApps = apps.filter((app) => {
    if (selectedType === 'all') return true;
    return app.tags.includes(selectedType);
  });

  return (
    <div className="min-h-screen bg-telegram-light p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-telegram-text">
            Каталог приложений
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'all'
                  ? 'bg-telegram-primary text-white'
                  : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setSelectedType('channel')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'channel'
                  ? 'bg-telegram-primary text-white'
                  : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
              }`}
            >
              Каналы
            </button>
            <button
              onClick={() => setSelectedType('bot')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'bot'
                  ? 'bg-telegram-primary text-white'
                  : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
              }`}
            >
              Боты
            </button>
            <button
              onClick={() => setSelectedType('app')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'app'
                  ? 'bg-telegram-primary text-white'
                  : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
              }`}
            >
              Приложения
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map((app) => (
            <CatalogItem key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
}; 