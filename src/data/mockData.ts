import { App } from '../types';

export const mockItems: App[] = [
  {
    id: '1',
    name: 'ITOQ Space Bot',
    description: 'Official bot for ITOQ Space community',
    icon: '🤖',
    tags: ['bot', 'community', 'support'],
    features: [
      'Community management',
      'User support',
      'Content moderation'
    ],
    category: 'bots',
    telegramLink: 'https://t.me/itoqspace_bot',
    link: 'https://t.me/itoqspace_bot'
  },
  {
    id: '2',
    name: 'ITOQ Space Channel',
    description: 'Official channel for ITOQ Space updates',
    icon: '📢',
    tags: ['channel', 'updates', 'news'],
    features: [
      'Project updates',
      'Announcements',
      'Community news'
    ],
    category: 'channels',
    telegramLink: 'https://t.me/itoqspace',
    link: 'https://t.me/itoqspace'
  },
  {
    id: '3',
    name: 'ITOQ News',
    description: 'Новостной канал о технологиях, разработке и обновлениях Telegram.',
    icon: '📰',
    tags: ['channel', 'news'],
    features: [
      'Ежедневные обновления',
      'Эксклюзивные материалы',
      'Обзоры приложений'
    ],
    category: 'channels',
    telegramLink: 'https://t.me/itoq_news',
    link: 'https://t.me/itoq_news'
  },
  {
    id: '4',
    name: 'ITOQ Dev',
    description: 'Инструменты и ресурсы для разработчиков Telegram Mini Apps.',
    icon: '👨‍💻',
    tags: ['app', 'development'],
    features: [
      'Шаблоны приложений',
      'API документация',
      'Примеры кода'
    ],
    category: 'apps',
    telegramLink: 'https://t.me/itoq_dev',
    link: 'https://t.me/itoq_dev'
  },
  {
    id: '5',
    name: 'Crypto Updates',
    description: 'Latest cryptocurrency news and analysis',
    icon: '💎',
    tags: ['cryptocurrency', 'finance'],
    features: [
      'Daily market updates',
      'Technical analysis',
      'Trading signals'
    ],
    category: 'channels',
    telegramLink: 'tg://resolve?domain=cryptoupdates',
    link: 'tg://resolve?domain=cryptoupdates'
  },
  {
    id: '6',
    name: 'Translation Bot',
    description: 'Translate text between multiple languages',
    icon: '🌐',
    tags: ['language', 'utility'],
    features: [
      'Multiple language support',
      'Quick translation',
      'Language detection'
    ],
    category: 'bots',
    telegramLink: 't.me/translatebot?start=translate',
    link: 't.me/translatebot?start=translate'
  },
  {
    id: '7',
    name: 'File Converter',
    description: 'Convert files between different formats',
    icon: '🔄',
    tags: ['tools', 'productivity'],
    features: [
      'Multiple format support',
      'Batch conversion',
      'Cloud storage integration'
    ],
    category: 'apps',
    telegramLink: 't.me/fileconverter_bot',
    link: 't.me/fileconverter_bot'
  }
]; 