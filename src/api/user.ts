import { client } from './client';
import { LoginBody, LoginResponse } from '../types';

export const login = async (data: LoginBody) => {
  const result = await client.post<never, LoginResponse>('/users', data);
  return result;
};
