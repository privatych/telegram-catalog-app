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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{item.icon}</span>
            <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full ${
              isFavorite ? 'text-red-500' : 'text-gray-400'
            } hover:text-red-500 transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isFavorite ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-4">{item.description}</p>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Функции:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {item.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.category.map((cat: string) => (
            <span
              key={cat}
              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {cat}
            </span>
          ))}
        </div>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Открыть в Telegram
        </a>
      </div>
    </motion.div>
  );
}; 