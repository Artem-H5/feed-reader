import React, { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userStateSelector } from '../../redux/auth/selector';

interface AuthGateProps {
  children: ReactNode;
}

const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isLogin } = useSelector(userStateSelector);

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [navigate, isLogin]);

  return <>{children}</>;
};

export default AuthGate;
