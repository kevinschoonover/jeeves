import { ADD_TO_CART, ADD_QUANTITY } from './action-types/cart-actions';

export const addToCart = (id: string) => {
  return {
    type: ADD_TO_CART,
    id,
  };
};

export const addQuantity = (id: number) => {
  return {
    type: ADD_QUANTITY,
    id,
  };
};
