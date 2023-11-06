import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export const feedsStateSelector = (state: RootState) => state.feeds;

export const feedItemStateSelector = createSelector(
  feedsStateSelector,
  (feedItem) => feedItem
);
