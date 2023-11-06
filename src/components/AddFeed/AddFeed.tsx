import React, { useState } from 'react';

import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedFetch } from '../../redux/feeds/thunk';
import { userStateSelector } from '../../redux/auth/selector';

import { Stack, TextField, Button } from '@mui/material';
import { StyledStack } from './style';

const AddFeed = () => {
  const [feedName, setFeedName] = useState('');
  const [feedURL, setFeedURL] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector(userStateSelector);

  const handleAddFeed = () => {
    const name = feedName;
    const url = feedURL;
    const userId = user.id;
    if (name && url && userId) {
      dispatch(addFeedFetch({ name, url, userId }));
      setFeedName('');
      setFeedURL('');
    }
  };

  return (
    <StyledStack direction='column' spacing={4}>
      <Stack spacing={2}>
        <Stack direction='row' spacing={2}>
          <TextField
            sx={{ flex: '1' }}
            id='name'
            name='name'
            label='Enter feed name'
            variant='outlined'
            value={feedName}
            inputProps={{
              maxLength: 25,
            }}
            onChange={(e) => setFeedName(e.target.value)}
          />
          <TextField
            sx={{ flex: '1' }}
            id='url'
            name='url'
            label='URL'
            variant='outlined'
            value={feedURL}
            inputProps={{
              maxLength: 100,
            }}
            onChange={(e) => setFeedURL(e.target.value)}
          />
        </Stack>
        <Button
          onClick={handleAddFeed}
          id='add-feed-btn'
          color='primary'
          variant='contained'
          size='large'
        >
          Add feed
        </Button>
      </Stack>
    </StyledStack>
  );
};

export default AddFeed;
