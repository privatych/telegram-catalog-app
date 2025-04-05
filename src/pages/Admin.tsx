import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { App } from '../types';

const Admin: React.FC = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [newApp, setNewApp] = useState<Partial<App>>({
    name: '',
    description: '',
    icon: '',
    features: [''],
    tags: [''],
    category: 'apps',
    telegramLink: ''
  });

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'apps'));
      const appsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as App[];
      setApps(appsData);
    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'apps'), {
        ...newApp,
        features: newApp.features?.filter(f => f.trim() !== ''),
        tags: newApp.tags?.filter(t => t.trim() !== '')
      });
      setApps([...apps, { ...newApp, id: docRef.id } as App]);
      setNewApp({
        name: '',
        description: '',
        icon: '',
        features: [''],
        tags: [''],
        category: 'apps',
        telegramLink: ''
      });
    } catch (error) {
      console.error('Error adding app:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'apps', id));
      setApps(apps.filter(app => app.id !== id));
    } catch (error) {
      console.error('Error deleting app:', error);
    }
  };

  const categories = [
    { id: 'bots', name: 'Боты' },
    { id: 'channels', name: 'Каналы' },
    { id: 'apps', name: 'Приложения' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="max-w-[100vw] mx-auto">
        <h1 className="text-xl font-bold mb-3">Админ-панель</h1>
        
        <div className="bg-white rounded-lg shadow-md p-3 mb-3">
          <h2 className="text-lg font-semibold mb-2">Добавить новое приложение</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Название</label>
              <input
                type="text"
                value={newApp.name}
                onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Описание</label>
              <textarea
                value={newApp.description}
                onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ссылка на иконку</label>
              <input
                type="text"
                value={newApp.icon}
                onChange={(e) => setNewApp({ ...newApp, icon: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Категория</label>
              <select
                value={newApp.category}
                onChange={(e) => setNewApp({ ...newApp, category: e.target.value as App['category'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                required
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ссылка в Telegram</label>
              <input
                type="text"
                value={newApp.telegramLink}
                onChange={(e) => setNewApp({ ...newApp, telegramLink: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Особенности (каждая с новой строки)</label>
              <textarea
                value={newApp.features?.join('\n')}
                onChange={(e) => setNewApp({ ...newApp, features: e.target.value.split('\n') })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Теги (через запятую)</label>
              <input
                type="text"
                value={newApp.tags?.join(', ')}
                onChange={(e) => setNewApp({ ...newApp, tags: e.target.value.split(',').map(t => t.trim()) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-1.5 px-3 rounded-md hover:bg-indigo-700 text-sm"
            >
              Добавить
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-3">
          <h2 className="text-lg font-semibold mb-2">Существующие приложения</h2>
          <div className="space-y-2">
            {apps.map(app => (
              <div key={app.id} className="border rounded-lg p-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate">{app.name}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{app.description}</p>
                    <div className="mt-1">
                      <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700">
                        {categories.find(c => c.id === app.category)?.name}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-red-600 hover:text-red-800 text-sm ml-2"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 