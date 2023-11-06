import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../actions';
import { loginFetch } from '../thunk';
import { User } from '../../../types';

export interface UserState {
  user: User;
  isLogin: boolean;
  loading: boolean;
  error: boolean | null;
}

export const initialState: UserState = {
  user: {
    name: '',
    id: null,
  },
  isLogin: false,
  loading: false,
  error: null,
};

const name = 'USER';

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout,
  },
  extraReducers(builder) {
    builder
      .addCase(loginFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginFetch.fulfilled, (state, { payload }) => {
        state.isLogin = true;
        state.loading = false;
        state.user = payload;
      })
      .addCase(loginFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { logout: logoutAction } = userSlice.actions;

export default userSlice.reducer;
