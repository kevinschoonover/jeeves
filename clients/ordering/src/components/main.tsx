import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tester from './test';
import App from '../App';

const Main = () => (
  <main>
    <Switch>
      <Route path="/menu" component={App} />
      <Route path="/test" component={Tester} />
    </Switch>
  </main>
);

export default Main;
