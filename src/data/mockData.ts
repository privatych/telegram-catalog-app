import { CatalogItem } from '../types';

export const mockItems: CatalogItem[] = [
  {
    id: '1',
    name: 'ITOQ Space',
    description: 'Каталог мини-приложений и ботов Telegram. Находите лучшие приложения для ваших задач.',
    icon: '🚀',
    tags: ['app', 'catalog'],
    features: [
      'Удобный поиск',
      'Категории приложений',
      'Подробные описания'
    ],
    link: 'https://t.me/itoqspace_bot',
    category: ['catalog', 'bot']
  },
  {
    id: '2',
    name: 'ITOQ Bot',
    description: 'Многофункциональный бот для управления задачами и проектами в Telegram.',
    icon: '🤖',
    tags: ['bot', 'productivity'],
    features: [
      'Управление задачами',
      'Напоминания',
      'Интеграция с календарем'
    ],
    link: 'https://t.me/itoq_bot',
    category: ['bot', 'productivity']
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
    link: 'https://t.me/itoq_news',
    category: ['channel', 'news']
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
    link: 'https://t.me/itoq_dev',
    category: ['development', 'tools']
  },
  {
    id: '5',
    type: 'channel',
    title: 'Crypto Updates',
    description: 'Latest cryptocurrency news and analysis',
    icon: '💎',
    link: 'tg://resolve?domain=cryptoupdates',
    category: ['Cryptocurrency', 'Finance'],
  },
  {
    id: '6',
    type: 'bot',
    title: 'Translation Bot',
    description: 'Translate text between multiple languages',
    icon: '🌐',
    link: 't.me/translatebot?start=translate',
    category: ['Language', 'Utility'],
  },
  {
    id: '7',
    type: 'mini-app',
    title: 'File Converter',
    description: 'Convert files between different formats',
    icon: '🔄',
    link: 't.me/fileconverter_bot',
    category: ['Tools', 'Productivity'],
  },
]; 