import { UserState } from '../reducer';

export const logout = (state: UserState) => {
  state.isLogin = false;
  state.user = {
    name: '',
    id: null,
  };
};
