import { IAppState } from '../state/AppState';
import { createSelector } from 'reselect';

const restaurantSelector = (state: IAppState) => state.restaurants;

export const getRestaurantItems = createSelector(
  restaurantSelector,
  (restaurant: any) => {
    return restaurant.items;
  }
);
