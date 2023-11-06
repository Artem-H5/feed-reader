import { createAsyncThunk } from '@reduxjs/toolkit';

import { login } from '../../../api/user';
import { LoginBody, LoginResponse } from '../../../types';

const LOGIN_THUNK_TYPE = 'LOGIN_THUNK_TYPE';

export const loginFetch = createAsyncThunk(
  LOGIN_THUNK_TYPE,
  async (data: LoginBody, { rejectWithValue }) => {
    try {
      const result: LoginResponse = await login(data);
      return result;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);
