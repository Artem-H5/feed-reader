import { feed, client } from './client';

import { Feed } from '../types';

export const feedData = async (url: string): Promise<string> => {
  return await feed.get(url);
};

export const getUserFeeds = async (id: number) => {
  await client.get(`/posts/?userId=${id}`);
  const userFeeds = localStorage.getItem('userFeeds');
  const parsedFeeds = userFeeds && JSON.parse(userFeeds);
  return parsedFeeds;
};

export const addFeed = async (data: Feed) => {
  const result = await client.post<never, Feed>('/posts', data);
  const existingData = localStorage.getItem('userFeeds');
  if (existingData) {
    const feeds = JSON.parse(existingData);
    if (Array.isArray(feeds)) {
      const updatedFeeds = [...feeds, result];
      localStorage.setItem('userFeeds', JSON.stringify(updatedFeeds));
    }
  }
  return result;
};

export const deleteFeed = async (id: string) => {
  await client.delete(`/posts/${id}`);

  const existingData = localStorage.getItem('userFeeds');
  if (existingData) {
    const feeds = JSON.parse(existingData);
    if (Array.isArray(feeds)) {
      const updatedFeeds = feeds.filter((feed, i) => Number(id) !== i);
      localStorage.setItem('userFeeds', JSON.stringify(updatedFeeds));
    }
  }
  return { id: id };
};
