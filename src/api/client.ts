import axios from 'axios';

export const feed = axios.create();

feed.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);
