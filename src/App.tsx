import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import AppProvider from './context/index';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
