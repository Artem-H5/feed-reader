import { combineReducers } from '@reduxjs/toolkit';

import feeds from '../../redux/feeds/reducer';
import user from '../../redux/auth/reducer';

export default combineReducers({
  feeds,
  user,
});
