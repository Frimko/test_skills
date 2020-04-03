import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

// @ts-ignore
import createStore from './shared/store/createStore';
import App from './app';
import theme from './shared/theme/default';

const store = createStore();

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

export default Root;
