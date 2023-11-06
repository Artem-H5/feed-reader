import React, { Suspense, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { userStateSelector } from '../../redux/auth/selector';

import Header from '../Header';
import { MainContainer } from './style';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLogin } = useSelector(userStateSelector);
  return (
    <>
      <MainContainer maxWidth={false} disableGutters>
        {isLogin && <Header />}
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </MainContainer>
    </>
  );
};

export default Layout;
