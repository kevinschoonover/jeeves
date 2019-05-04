const Resourcer = require('redux-rest-resource');

import { baseUrl } from './base';

export const { types, actions, rootReducer } = Resourcer.createResource({
  name: 'menu',
  url: `${baseUrl}/menus/:id`,
});
