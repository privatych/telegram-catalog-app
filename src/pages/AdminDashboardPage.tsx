import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogStore, App } from '../store/catalogStore';
import { useAuthStore } from '../store/authStore';

type AppCategory = 'bot' | 'channel' | 'app';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();
  const { apps, loadApps } = useCatalogStore();
  const [newApp, setNewApp] = useState<Partial<App>>({
    name: '',
    description: '',
    icon: '',
    tags: [],
    features: [],
    link: '',
  });
  const [newTag, setNewTag] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>('app');

  const handleAddApp = async () => {
    if (!newApp.name || !newApp.description) return;

    const appData = {
      name: newApp.name,
      description: newApp.description,
      icon: newApp.icon || '📱',
      tags: [...(newApp.tags || []), selectedCategory],
      features: newApp.features || [],
      link: newApp.link || '',
    };

    // В этой версии мы не можем добавлять новые приложения через админку
    // Вместо этого нужно обновлять файл apps.json вручную
    alert('В демо-версии добавление приложений отключено. Пожалуйста, обновите файл apps.json вручную.');

    setNewApp({
      name: '',
      description: '',
      icon: '',
      tags: [],
      features: [],
      link: '',
    });
    setEditingApp(null);
    setSelectedCategory('app');
  };

  const handleEditApp = (app: App) => {
    setNewApp({
      name: app.name,
      description: app.description,
      icon: app.icon,
      tags: app.tags.filter(tag => !['bot', 'channel', 'app'].includes(tag)),
      features: app.features,
      link: app.link,
    });
    const category = app.tags.find(tag => ['bot', 'channel', 'app'].includes(tag)) as AppCategory || 'app';
    setSelectedCategory(category);
    setEditingApp(app);
  };

  const handleAddTag = () => {
    if (newTag && !newApp.tags?.includes(newTag)) {
      setNewApp({
        ...newApp,
        tags: [...(newApp.tags || []), newTag],
      });
      setNewTag('');
    }
  };

  const handleAddFeature = () => {
    if (newFeature && !newApp.features?.includes(newFeature)) {
      setNewApp({
        ...newApp,
        features: [...(newApp.features || []), newFeature],
      });
      setNewFeature('');
    }
  };

  const handleDeleteApp = async (id: string) => {
    // В этой версии мы не можем удалять приложения через админку
    alert('В демо-версии удаление приложений отключено. Пожалуйста, обновите файл apps.json вручную.');
  };

  const handleCancelEdit = () => {
    setNewApp({
      name: '',
      description: '',
      icon: '',
      tags: [],
      features: [],
      link: '',
    });
    setEditingApp(null);
    setSelectedCategory('app');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium text-telegram-text">
          Админ-панель
        </h1>
        <button
          onClick={async () => {
            await signOut();
            navigate('/admin/login');
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Выйти
        </button>
      </div>

      <div className="bg-telegram-background rounded-lg shadow-card p-4">
        <h2 className="text-lg font-medium text-telegram-text mb-4">
          {editingApp ? 'Редактировать приложение' : 'Добавить новое приложение'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-telegram-text-secondary mb-1">
              Категория
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('app')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'app'
                    ? 'bg-telegram-primary text-white'
                    : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
                }`}
              >
                Приложение
              </button>
              <button
                onClick={() => setSelectedCategory('bot')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'bot'
                    ? 'bg-telegram-primary text-white'
                    : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
                }`}
              >
                Бот
              </button>
              <button
                onClick={() => setSelectedCategory('channel')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'channel'
                    ? 'bg-telegram-primary text-white'
                    : 'bg-telegram-surface text-telegram-text-secondary hover:bg-telegram-light'
                }`}
              >
                Канал
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-telegram-text-secondary mb-1">
              Название
            </label>
            <input
              type="text"
              value={newApp.name}
              onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
              className="w-full px-3 py-2 border border-telegram-light rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-telegram-primary
                       text-telegram-text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-telegram-text-secondary mb-1">
              Описание
            </label>
            <textarea
              value={newApp.description}
              onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
              className="w-full px-3 py-2 border border-telegram-light rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-telegram-primary
                       text-telegram-text"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-telegram-text-secondary mb-1">
              Иконка (эмодзи)
            </label>
            <input
              type="text"
              value={newApp.icon}
              onChange={(e) => setNewApp({ ...newApp, icon: e.target.value })}
              className="w-full px-3 py-2 border border-telegram-light rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-telegram-primary
                       text-telegram-text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-telegram-text-secondary mb-1">
              Ссылка
            </label>
            <input
              type="text"
              value={newApp.link}
              onChange={(e) => setNewApp({ ...newApp, link: e.target.value })}
              className="w-full px-3 py-2 border border-telegram-light rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-telegram-primary
                       text-telegram-text"
              placeholder="https://t.me/your_app"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-telegram-text-secondary mb-1">
              Теги
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-3 py-2 border border-telegram-light rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-telegram-primary
                         text-telegram-text"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-telegram-primary text-white rounded-lg
                         hover:bg-telegram-secondary transition-colors"
              >
                Добавить
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newApp.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-telegram-surface text-telegram-text-secondary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-telegram-text-secondary mb-1">
              Возможности
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 px-3 py-2 border border-telegram-light rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-telegram-primary
                         text-telegram-text"
              />
              <button
                onClick={handleAddFeature}
                className="px-4 py-2 bg-telegram-primary text-white rounded-lg
                         hover:bg-telegram-secondary transition-colors"
              >
                Добавить
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newApp.features?.map((feature) => (
                <span
                  key={feature}
                  className="px-2 py-1 bg-telegram-surface text-telegram-text-secondary rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddApp}
              className="flex-1 py-2 bg-telegram-primary text-white rounded-lg
                       hover:bg-telegram-secondary transition-colors"
            >
              {editingApp ? 'Сохранить изменения' : 'Добавить приложение'}
            </button>
            {editingApp && (
              <button
                onClick={handleCancelEdit}
                className="flex-1 py-2 bg-gray-500 text-white rounded-lg
                         hover:bg-gray-600 transition-colors"
              >
                Отмена
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-telegram-background rounded-lg shadow-card p-4">
        <h2 className="text-lg font-medium text-telegram-text mb-4">
          Существующие приложения
        </h2>
        
        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="flex items-start justify-between p-4 border border-telegram-light rounded-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex-shrink-0 bg-telegram-surface
                              rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{app.icon}</span>
                </div>
                <div>
                  <h3 className="font-medium text-telegram-text">{app.name}</h3>
                  <p className="text-sm text-telegram-text-secondary">
                    {app.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
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
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditApp(app)}
                  className="px-3 py-1 text-telegram-primary hover:text-telegram-secondary transition-colors"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDeleteApp(app.id)}
                  className="px-3 py-1 text-red-500 hover:text-red-600 transition-colors"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 