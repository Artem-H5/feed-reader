import { FeedItem } from '../types';

export default function parseXMLData(xmlData: string): FeedItem[] {
  const xml = new DOMParser().parseFromString(xmlData, 'text/xml');
  const items = Array.from(xml.querySelectorAll('item'));
  return items.map((item) => {
    const titleElement = item.querySelector('title');
    const dateElement = item.querySelector('pubDate');
    const contentElement = item.querySelector('encoded');
    const descriptionElement = item.querySelector('description');

    if (titleElement && dateElement) {
      const title = titleElement?.textContent;
      const date = dateElement?.textContent;
      const content = contentElement?.textContent;
      const description = descriptionElement?.textContent;
      return {
        title,
        date,
        content,
        description,
      };
    } else {
      return {
        title: 'No data',
        date: 'No data',
        content: 'No data',
        description: 'No data',
      };
    }
  });
}
