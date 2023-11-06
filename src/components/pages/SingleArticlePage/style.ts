import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledCrumpsLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: '#AAAFBE',
  ':hover': {
    textDecoration: 'underline',
  },
}));
