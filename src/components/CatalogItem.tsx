import React from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '../store/catalogStore';

interface CatalogItemProps {
  app: App;
}

export const CatalogItem: React.FC<CatalogItemProps> = ({ app }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/app/${app.id}`);
  };

  const handleTelegramClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(app.telegramLink, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      className="bg-telegram-background rounded-lg shadow-card p-4 cursor-pointer
                 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 flex-shrink-0 bg-telegram-surface
                      rounded-lg flex items-center justify-center">
          <span className="text-2xl">{app.icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-telegram-text">{app.name}</h3>
            <button
              onClick={handleTelegramClick}
              className="px-3 py-1 bg-telegram-primary text-white rounded-lg
                       hover:bg-telegram-secondary transition-colors text-sm"
            >
              Перейти
            </button>
          </div>
          <p className="text-sm text-telegram-text-secondary mt-1">
            {app.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-telegram-surface text-telegram-text-secondary
                         rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 