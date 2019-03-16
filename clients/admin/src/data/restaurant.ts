const Resourcer = require('redux-rest-resource');

export const { types, actions, rootReducer } = Resourcer.createResource({
  name: 'restaurant',
  url: `http://5c87fe52674aad0014cac4f6.mockapi.io/restaurant/:id`,
});
