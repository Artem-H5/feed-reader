import React from 'react';
import { Link } from 'react-router-dom';

import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { userStateSelector } from '../../redux/auth/selector';
import { logoutAction } from '../../redux/auth/reducer';

import { Stack, Button, Typography } from '@mui/material';
import { HeaderContainer } from './style';

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector(userStateSelector);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <HeaderContainer>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        height='100%'
      >
        <Link to='/'>
          <Typography variant='h6' color='initial'>
            Feed Reader
          </Typography>
        </Link>
        <Stack
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          spacing={2}
        >
          <Typography variant='body1' color='initial'>
            Hello, {user.name}
          </Typography>
          <Button onClick={handleLogout} variant='outlined' color='error'>
            Logout
          </Button>
        </Stack>
      </Stack>
    </HeaderContainer>
  );
};

export default Header;
