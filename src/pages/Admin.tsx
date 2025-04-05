import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '../types';

const Admin = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<App[]>([]);
  const [newApp, setNewApp] = useState<Partial<App>>({
    name: '',
    description: '',
    icon: '',
    tags: [],
    features: [],
    link: ''
  });

  useEffect(() => {
    // Загрузка существующих приложений
    fetch('/data/apps.json')
      .then(response => response.json())
      .then(data => setApps(data.apps))
      .catch(error => console.error('Error loading apps:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Добавляем новое приложение
    const updatedApps = [...apps, {
      ...newApp,
      id: (apps.length + 1).toString()
    } as App];

    // Обновляем файл apps.json
    try {
      const response = await fetch('/api/apps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apps: updatedApps }),
      });

      if (response.ok) {
        setApps(updatedApps);
        setNewApp({
          name: '',
          description: '',
          icon: '',
          tags: [],
          features: [],
          link: ''
        });
      }
    } catch (error) {
      console.error('Error saving app:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Админ-панель</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700">Теги (через запятую)</label>
              <input
                type="text"
                value={newApp.tags?.join(', ')}
                onChange={(e) => setNewApp({ ...newApp, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Функции (каждая с новой строки)</label>
              <textarea
                value={newApp.features?.join('\n')}
                onChange={(e) => setNewApp({ ...newApp, features: e.target.value.split('\n').map(feature => feature.trim()) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ссылка</label>
              <input
                type="url"
                value={newApp.link}
                onChange={(e) => setNewApp({ ...newApp, link: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Добавить приложение
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin; 