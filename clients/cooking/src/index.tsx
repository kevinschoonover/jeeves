import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core';
import { theme } from '@jeeves/common';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// tslint:disable-next-line:no-var-requires
require('typeface-raleway')

ReactDOM.render(
  <div>
    {/* <link rel="stylesheet" href="https://use.typekit.net/wit3vci.css" /> */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
