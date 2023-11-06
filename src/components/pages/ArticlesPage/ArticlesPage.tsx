import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';

import { AppDispatch } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedDataFetch } from '../../../redux/feeds/thunk';
import {
  feedItemStateSelector,
  feedsStateSelector,
} from '../../../redux/feeds/selector';
import { FeedItem } from '../../../types';
import BasicBreadcrumbs from '../../BasicBreadcrumbs';

import {
  Stack,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';

const ArticlesPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { feedItem, loading, error } = useSelector(feedItemStateSelector);
  const navigate = useNavigate();
  const { url } = useParams();
  const decodedUrl = url && decodeURIComponent(url);
  useEffect(() => {
    if (decodedUrl) {
      dispatch(getFeedDataFetch(decodedUrl));
    }
  }, [decodedUrl, dispatch]);
  const { feeds } = useSelector(feedsStateSelector);
  const feedTitle =
    decodedUrl && feeds.find((item) => decodedUrl === item.url)?.name;

  const handleFeedItemClick = (e: React.SyntheticEvent) => {
    const id = e.currentTarget.getAttribute('data-article-id');
    url && navigate(`/articles/${encodeURIComponent(url)}/article/${id}`);
  };

  return (
    <Stack justifyContent='space-between' spacing={2}>
      <BasicBreadcrumbs>
        <Typography color='text.primary'>{feedTitle}</Typography>
      </BasicBreadcrumbs>
      {!loading &&
        !error &&
        feedItem.map(({ title, date }: FeedItem, i: number) => {
          return (
            <Card
              data-article-id={i}
              key={i}
              sx={{ height: '5rem' }}
              onClick={handleFeedItemClick}
            >
              <CardActionArea sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='body1'>{title}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {date && <Moment format='DD/MM/YYYY'>{date}</Moment>}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}

      {loading && (
        <Stack alignItems='center' justifyContent='center' height='80vh'>
          <CircularProgress />
        </Stack>
      )}
      {error && (
        <Typography variant='body1' color='error'>
          Cannot parse the data
        </Typography>
      )}
    </Stack>
  );
};

export default ArticlesPage;
