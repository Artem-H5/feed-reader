import { Feed } from '../types';

export const defaultFeeds: Feed[] = [
  {
    name: 'NASA Breaking news',
    url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
  },
  {
    name: 'The Sun World News',
    url: 'https://www.thesun.co.uk/news/worldnews/feed/',
  },
  {
    name: 'TIME',
    url: 'https://time.com/feed/',
  },
];

if (!localStorage.getItem('userFeeds')) {
  localStorage.setItem('userFeeds', JSON.stringify(defaultFeeds));
}
