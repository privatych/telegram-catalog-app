import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { App } from '../types';
import { mockItems } from '../data/mockData';

const Home: React.FC = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'apps'));
      if (querySnapshot.empty) {
        // Если коллекция пуста, добавляем начальные данные
        const appsCollection = collection(db, 'apps');
        for (const item of mockItems) {
          await addDoc(appsCollection, item);
        }
        setApps(mockItems);
      } else {
        const appsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as App[];
        setApps(appsData);
      }
    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'bots', name: 'Боты' },
    { id: 'channels', name: 'Каналы' },
    { id: 'apps', name: 'Приложения' }
  ];

  const filteredApps = selectedCategory === 'all' 
    ? apps 
    : apps.filter(app => app.category === selectedCategory);

  const handleAppClick = (app: App) => {
    setSelectedApp(app);
  };

  const handleBackClick = () => {
    setSelectedApp(null);
  };

  if (selectedApp) {
    return (
      <div className="min-h-screen bg-gray-100 p-2">
        <div className="max-w-[100vw] mx-auto">
          <button
            onClick={handleBackClick}
            className="mb-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
          >
            ← Назад
          </button>
          <div className="bg-white rounded-lg shadow-md p-3">
            <div className="flex items-center mb-3">
              <span className="text-4xl mr-3">{selectedApp.icon}</span>
              <div>
                <h2 className="text-lg font-bold">{selectedApp.name}</h2>
                <p className="text-sm text-gray-600">{selectedApp.description}</p>
              </div>
            </div>
            <div className="mb-3">
              <h3 className="text-base font-semibold mb-1">Особенности:</h3>
              <ul className="list-disc list-inside text-sm">
                {selectedApp.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mb-3">
              <h3 className="text-base font-semibold mb-1">Теги:</h3>
              <div className="flex flex-wrap gap-1">
                {selectedApp.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-200 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={selectedApp.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
            >
              Открыть в Telegram
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="max-w-[100vw] mx-auto">
        <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredApps.map(app => (
            <div
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="bg-white rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <span className="text-3xl mr-3">{app.icon}</span>
                <div>
                  <h3 className="font-semibold">{app.name}</h3>
                  <p className="text-sm text-gray-600">{app.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 