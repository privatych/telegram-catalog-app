import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { App } from '../types';

const Home = () => {
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    fetch('/data/apps.json')
      .then(response => response.json())
      .then(data => setApps(data.apps))
      .catch(error => console.error('Error loading apps:', error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог приложений</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <div key={app.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{app.icon}</span>
                <h2 className="text-xl font-semibold text-gray-900">{app.name}</h2>
              </div>
              
              <p className="text-gray-600 mb-4">{app.description}</p>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Функции:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {app.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {app.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <a
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Открыть в Telegram
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 