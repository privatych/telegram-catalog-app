import React, { useEffect } from 'react';
import { useCatalogStore } from '../store/catalogStore';
import { CatalogItem } from '../components/CatalogItem';

export const CatalogPage: React.FC = () => {
  const { apps, selectedType, setSelectedType, loadApps, isLoading, error } = useCatalogStore();

  useEffect(() => {
    loadApps();
  }, [loadApps]);

  const filteredApps = apps.filter((app) => {
    if (!selectedType || selectedType === 'all') return true;
    return app.tags.includes(selectedType);
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-telegram-text-secondary">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 -mx-4 px-4 py-2 overflow-x-auto hide-scrollbar bg-telegram-background sticky top-[52px] z-10">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            !selectedType || selectedType === 'all'
              ? 'bg-telegram-primary text-white'
              : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setSelectedType('channel')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            selectedType === 'channel'
              ? 'bg-telegram-primary text-white'
              : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
          }`}
        >
          Каналы
        </button>
        <button
          onClick={() => setSelectedType('bot')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            selectedType === 'bot'
              ? 'bg-telegram-primary text-white'
              : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
          }`}
        >
          Боты
        </button>
        <button
          onClick={() => setSelectedType('app')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            selectedType === 'app'
              ? 'bg-telegram-primary text-white'
              : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
          }`}
        >
          Приложения
        </button>
      </div>

      <div className="space-y-2">
        {filteredApps.map((app) => (
          <CatalogItem key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}; 