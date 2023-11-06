import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';

import { AppDispatch } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedDataFetch } from '../../../redux/feeds/thunk';
import {
  feedItemStateSelector,
  feedsStateSelector,
} from '../../../redux/feeds/selector';

import { Stack, Typography, CircularProgress } from '@mui/material';
import BasicBreadcrumbs from '../../BasicBreadcrumbs';
import { StyledCrumpsLink } from './style';

const SingleArticlePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { feedItem, loading, error } = useSelector(feedItemStateSelector);
  const { feeds } = useSelector(feedsStateSelector);
  const { url } = useParams();
  const { id } = useParams();
  const decodedUrl = url && decodeURIComponent(url);
  const encodedUrl = url && encodeURIComponent(url);
  const feedTitle =
    decodedUrl && feeds.find((item) => decodedUrl === item.url)?.name;

  useEffect(() => {
    if (decodedUrl) {
      dispatch(getFeedDataFetch(decodedUrl));
    }
  }, [decodedUrl, dispatch]);

  const currentArticle = feedItem.filter(
    (item, i: number) => Number(id) === i
  )[0];

  const { title, date, content, description } = currentArticle;
  const addEllipsis = (text: string) => {
    if (text.length > 80) {
      return text.substring(0, 80) + '...';
    } else {
      return text;
    }
  };

  return (
    <Stack>
      <BasicBreadcrumbs>
        <StyledCrumpsLink to={`/articles/${encodedUrl}`}>
          {feedTitle}
        </StyledCrumpsLink>
        <Typography color='text.primary'>
          {title && addEllipsis(title)}
        </Typography>
      </BasicBreadcrumbs>
      {!error && !loading && (
        <Stack
          direction='column'
          spacing={4}
          sx={{
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              transform: 'scale(1) !important',
            },
            '& svg': {
              maxWidth: '2%',
              height: 'auto',
            },
          }}
        >
          <Typography variant='h5' color='initial'>
            {title}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            {date && <Moment format='DD/MM/YYYY'>{date}</Moment>}
          </Typography>
          {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
          {!content && (
            <Typography variant='body1' color='initial'>
              {description}
            </Typography>
          )}
        </Stack>
      )}
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

export default SingleArticlePage;
