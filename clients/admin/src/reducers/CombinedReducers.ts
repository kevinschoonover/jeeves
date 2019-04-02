import { combineReducers } from 'redux';
import { UtilityReducer } from './UtilityReducer';
import { AuthenticationReducer } from './AuthenticationReducer';
import { rootReducer as accountReducers } from '../data/account';
import { rootReducer as materialsReducers } from '../data/material';
import { rootReducer as mailReducers } from '../data/mail';
import { rootReducer as restaurantReducers } from '../data/restaurant';
import { rootReducer as menuReducers } from '../data/menu';
import { rootReducer as reservationReducers } from '../data/reservation';
// HERE: add

export const reducers = combineReducers({
  utility: UtilityReducer,
  authentication: AuthenticationReducer,
  accounts: accountReducers,
  materials: materialsReducers,
  mail: mailReducers,
  restaurants: restaurantReducers,
  menus: menuReducers,
  reservations: reservationReducers,
  // HERE: add
});
