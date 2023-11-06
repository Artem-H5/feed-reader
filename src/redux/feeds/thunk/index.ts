import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  feedData,
  addFeed,
  deleteFeed,
  getUserFeeds,
} from '../../../api/feeds';
import { Feed } from '../../../types';

const GET_FEEDS_FETCH_THUNK_TYPE = 'GET_FEEDS_FETCH_THUNK_TYPE';
const ADD_FEED_FETCH_THUNK_TYPE = 'ADD_FEED_FETCH_THUNK_TYPE';
const DELETE_FEED_FETCH_THUNK_TYPE = 'DELETE_FEED_FETCH_THUNK_TYPE';
const GET_USER_FEEDS_FETCH_THUNK_TYPE = 'GET_USER_FEEDS_FETCH_THUNK_TYPE';

export const getFeedDataFetch = createAsyncThunk(
  GET_FEEDS_FETCH_THUNK_TYPE,
  async (url: string, { rejectWithValue }) => {
    try {
      const result = await feedData(url);
      return result;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getUserFeedsFetch = createAsyncThunk(
  GET_USER_FEEDS_FETCH_THUNK_TYPE,
  async (id: number, { rejectWithValue }) => {
    try {
      const result = await getUserFeeds(id);
      return result;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const addFeedFetch = createAsyncThunk(
  ADD_FEED_FETCH_THUNK_TYPE,
  async (data: Feed, { rejectWithValue }) => {
    try {
      const result = await addFeed(data);
      return result;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteFeedFetch = createAsyncThunk(
  DELETE_FEED_FETCH_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteFeed(id);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);
