import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogStore, App } from '../store/catalogStore';
import { useAuthStore } from '../store/authStore';

type AppCategory = 'bots' | 'channels' | 'apps';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();
  const { apps, loadApps } = useCatalogStore();
  const [newApp, setNewApp] = useState<Partial<App>>({
    name: '',
    description: '',
    icon: '',
    features: [''],
    tags: [''],
    category: 'apps',
    telegramLink: ''
  });
  const [newTag, setNewTag] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>('apps');

  const handleAddApp = async () => {
    if (!newApp.name || !newApp.description) return;

    const appData = {
      name: newApp.name,
      description: newApp.description,
      icon: newApp.icon || '📱',
      tags: [...(newApp.tags || []), selectedCategory],
      features: newApp.features || [''],
      telegramLink: newApp.telegramLink || '',
      category: selectedCategory,
    };

    // В этой версии мы не можем добавлять новые приложения через админку
    // Вместо этого нужно обновлять файл apps.json вручную
    alert('В демо-версии добавление приложений отключено. Пожалуйста, обновите файл apps.json вручную.');

    setNewApp({
      name: '',
      description: '',
      icon: '',
      tags: [],
      features: [''],
      telegramLink: '',
      category: 'apps',
    });
    setEditingApp(null);
    setSelectedCategory('apps');
  };

  const handleEditApp = (app: App) => {
    setNewApp({
      name: app.name,
      description: app.description,
      icon: app.icon,
      tags: app.tags.filter(tag => !['bots', 'channels', 'apps'].includes(tag)),
      features: app.features,
      telegramLink: app.telegramLink,
    });
    const category = app.tags.find(tag => ['bots', 'channels', 'apps'].includes(tag)) as AppCategory || 'apps';
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
      features: [''],
      telegramLink: '',
      category: 'apps',
    });
    setEditingApp(null);
    setSelectedCategory('apps');
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Админ-панель</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Выйти
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Добавить новое приложение</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddApp(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Название</label>
              <input
                type="text"
                value={newApp.name}
                onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Описание</label>
              <textarea
                value={newApp.description}
                onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Иконка (эмодзи)</label>
              <input
                type="text"
                value={newApp.icon}
                onChange={(e) => setNewApp({ ...newApp, icon: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Категория</label>
              <div className="flex space-x-4 mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('apps')}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === 'apps'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Приложения
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('bots')}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === 'bots'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Боты
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('channels')}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === 'channels'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Каналы
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ссылка в Telegram</label>
              <input
                type="text"
                value={newApp.telegramLink}
                onChange={(e) => setNewApp({ ...newApp, telegramLink: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Особенности (каждая с новой строки)</label>
              <textarea
                value={newApp.features?.join('\n')}
                onChange={(e) => setNewApp({ ...newApp, features: e.target.value.split('\n') })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Теги (через запятую)</label>
              <input
                type="text"
                value={newApp.tags?.join(', ')}
                onChange={(e) => setNewApp({ ...newApp, tags: e.target.value.split(',').map(t => t.trim()) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Добавить
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Существующие приложения</h2>
          <div className="space-y-4">
            {apps.map(app => (
              <div key={app.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{app.name}</h3>
                    <p className="text-gray-600">{app.description}</p>
                    <div className="mt-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        {app.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditApp(app)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDeleteApp(app.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 