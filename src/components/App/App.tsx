import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ArticlesPage from '../pages/ArticlesPage';
import LoginPage from '../pages/LoginPage';
import AuthGate from '../AuthGate';
import Layout from '../Layout';
import SingleArticlePage from '../pages/SingleArticlePage';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../../theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Layout>
            <AuthGate>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='articles/:url' element={<ArticlesPage />} />
                <Route
                  path='/articles/:url/article/:id'
                  element={<SingleArticlePage />}
                />
                <Route path='/login' element={<LoginPage />} />
              </Routes>
            </AuthGate>
          </Layout>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
