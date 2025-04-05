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
      onClick={handleCardClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img src={item.icon} alt={item.name} className="w-10 h-10 rounded-lg mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full ${
              isFavorite ? 'text-red-500' : 'text-gray-400'
            } hover:text-red-500 transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

        <p className="text-sm text-gray-600 mb-3">{item.description}</p>

        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-900 mb-1">Особенности:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {item.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={item.telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Открыть в Telegram
        </a>
      </div>
    </motion.div>
  );
}; 