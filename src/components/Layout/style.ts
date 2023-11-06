import { Container, styled } from '@mui/material';

export const MainContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0, 7.5, 5),
  maxWidth: 1200,
  [theme.breakpoints.down('md')]: {},
}));
