import { baseUrl } from './base';

const Resourcer = require('redux-rest-resource');

export const { types, actions, rootReducer } = Resourcer.createResource({
  name: 'menuItem',
  url: `${baseUrl}/menuItems/:id`,
});
