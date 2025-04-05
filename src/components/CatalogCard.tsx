import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CatalogItem } from '../types';
import { useStore } from '../store';

interface CatalogCardProps {
  item: CatalogItem;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useStore();

  const isFavorite = favorites.includes(item.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  const handleCardClick = () => {
    navigate(`/app/${item.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{item.icon}</span>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
          {item.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.category.map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 