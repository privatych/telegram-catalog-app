import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CatalogCard } from '../components/CatalogCard';
import { Category } from '../types';
import { mockItems } from '../data/mockData';

const categories: Category[] = [
  { id: 'channel', name: 'Channels', icon: '📢' },
  { id: 'bot', name: 'Bots', icon: '🤖' },
  { id: 'mini-app', name: 'Mini Apps', icon: '📱' },
];

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = mockItems.filter((item) => {
    const matchesCategory = !selectedCategory || item.type === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
            Telegram Catalog
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover amazing channels, bots, and mini apps
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}; 