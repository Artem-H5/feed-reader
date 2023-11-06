import { createSlice } from '@reduxjs/toolkit';
import { Feed, FeedItem } from '../../../types';
import parseXMLData from '../../../utilz/parseXMLData';
import { defaultFeeds } from '../../../feedsData';
import {
  getFeedDataFetch,
  addFeedFetch,
  deleteFeedFetch,
  getUserFeedsFetch,
} from '../thunk';

export interface FeedsState {
  loading: boolean;
  error: boolean | null;
  feeds: Feed[];
  feedItem: FeedItem[];
}

export const initialState: FeedsState = {
  loading: false,
  error: null,
  feeds: defaultFeeds,
  feedItem: [],
};

const name = 'FEEDS';

const feedsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeedDataFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getFeedDataFetch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.feedItem = parseXMLData(payload);
      })
      .addCase(getFeedDataFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addFeedFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addFeedFetch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.feeds = [...state.feeds, payload];
      })
      .addCase(addFeedFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteFeedFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteFeedFetch.fulfilled, (state, { payload }) => {
        state.loading = false;
        const feedId = payload.id;
        state.feeds = state.feeds.filter((feed, i) => Number(feedId) !== i);
      })
      .addCase(deleteFeedFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUserFeedsFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserFeedsFetch.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.feeds = payload;
        }
      })
      .addCase(getUserFeedsFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default feedsSlice.reducer;
