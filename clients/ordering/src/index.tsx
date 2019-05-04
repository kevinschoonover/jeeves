import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core';
import { theme } from '@jeeves/common';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StripeProvider } from 'react-stripe-elements';

const store = createStore(cartReducer);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StripeProvider apiKey="pk_test_12345">
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </StripeProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
