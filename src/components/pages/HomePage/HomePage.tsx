import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { AppDispatch } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFeedFetch } from '../../../redux/feeds/thunk';
import { feedsStateSelector } from '../../../redux/feeds/selector';
import { userStateSelector } from '../../../redux/auth/selector';
import { getUserFeedsFetch } from '../../../redux/feeds/thunk';

import AddFeed from '../../AddFeed';

import {
  Stack,
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Feed } from '../../../types';

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { feeds, error, loading } = useSelector(feedsStateSelector);
  const { user } = useSelector(userStateSelector);

  useEffect(() => {
    user.id && dispatch(getUserFeedsFetch(user.id));
  }, [dispatch, user.id]);

  const handleFeedClick = (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    navigate(`/articles/${encodedUrl}`);
  };

  const handleFeedDelete = (e: React.SyntheticEvent) => {
    const feedId = e.currentTarget.getAttribute('data-del-btn-id');
    feedId && dispatch(deleteFeedFetch(feedId));
  };

  return (
    <Stack direction='column' spacing={4}>
      <AddFeed />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        {!error &&
          !loading &&
          feeds.map((feed: Feed, i) => {
            return (
              <Card key={i}>
                <Stack direction='row' justifyContent='space-between'>
                  <CardActionArea onClick={() => handleFeedClick(feed.url)}>
                    <CardContent>
                      <Typography variant='body1' color='initial'>
                        {feed && feed.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <IconButton
                    data-del-btn-id={i}
                    onClick={handleFeedDelete}
                    aria-label='delete'
                    sx={{
                      borderRadius: '0',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Card>
            );
          })}
      </Box>
      {!error && !loading && feeds.length === 0 && (
        <Typography variant='h5' color='initial' textAlign='center'>
          No feeds available. Please add some feeds
        </Typography>
      )}
      {loading && (
        <Stack alignItems='center' justifyContent='center' height='30vh'>
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
};

export default HomePage;
