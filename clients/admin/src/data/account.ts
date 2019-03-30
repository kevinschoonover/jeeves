const Resourcer = require('redux-rest-resource');

export const { types, actions, rootReducer } = Resourcer.createResource({
    name: 'account',
    url: `http://5c9152f2c6354a001403775a.mockapi.io/accounts/:id`
});
