import React, { useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router';

import { AppDispatch } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { loginFetch } from '../../../redux/auth/thunk';
import { userStateSelector } from '../../../redux/auth/selector';

import { Stack, Box, TextField, Button, Typography } from '@mui/material';

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector(userStateSelector);
  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    if (name && password === 'pass') {
      dispatch(loginFetch({ name, password }));
    }
  };

  return (
    <Box>
      <Stack alignItems='center' justifyContent='center' height='100vh'>
        <Typography variant='h4' color='initial' mb={5}>
          Welcome to the feed reader
        </Typography>
        <form
          onSubmit={onSubmit}
          id='login-form'
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <TextField
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            inputProps={{
              maxLength: 20,
            }}
          />
          <TextField
            id='password'
            name='password'
            label='Password'
            variant='outlined'
            inputProps={{
              maxLength: 15,
            }}
          />
          <Button
            id='login-btn'
            color='primary'
            variant='contained'
            type='submit'
            sx={{ width: '50%' }}
          >
            Login
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default LoginPage;
