import { Container, styled } from '@mui/material';

export const HeaderContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#b1bbc666',
  margin: theme.spacing(2, 0, 4),
  borderRadius: '10px',
  height: theme.spacing(10),
}));
