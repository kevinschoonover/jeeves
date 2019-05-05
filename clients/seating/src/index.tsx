import React from 'react';
import ReactDOM from 'react-dom';
import {
  MuiThemeProvider as ThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import { theme, JeevesProvider } from '@jeeves/common';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SeatingProvider } from './components/SeatingProvider';

const restaurantId = '37ec8893-46d1-4fa8-9631-e3f60e5d0f8f';

ReactDOM.render(
  <JeevesProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SeatingProvider restaurantId={restaurantId}>
        <App />
      </SeatingProvider>
    </ThemeProvider>
  </JeevesProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
