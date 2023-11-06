export interface LoginBody {
  name: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  password: string;
  id: number;
}

export interface User {
  name: string;
  id: number | null;
}

export interface FeedItem {
  title: string | null;
  date: string | null;
  content?: string | null;
  description?: string | null;
}

export interface Feed {
  name: string;
  url: string;
  userId?: number;
}
