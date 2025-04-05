import React from 'react';
import { motion } from 'framer-motion';
import { CatalogCard } from '../components/CatalogCard';
import { Category } from '../types';
import { mockItems } from '../data/mockData';

const categories: Category[] = [
  {
    id: 'all',
    name: 'Все',
    icon: '📱'
  },
  {
    id: 'bot',
    name: 'Боты',
    icon: '🤖'
  },
  {
    id: 'channel',
    name: 'Каналы',
    icon: '📢'
  },
  {
    id: 'app',
    name: 'Приложения',
    icon: '📲'
  }
];

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredItems = selectedCategory === 'all'
    ? mockItems
    : mockItems.filter(item => item.category.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
            Каталог приложений
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover amazing channels, bots, and mini apps
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredItems.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}; 