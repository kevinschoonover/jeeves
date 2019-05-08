import {
  ADD_TO_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  REMOVE_ITEM,
  ADD_ORDER,
  PURCHASE,
  ADD_REQUEST,
} from './action-types/cart-actions';

export const addToCart = (id: string) => {
  return {
    type: ADD_TO_CART,
    id,
  };
};

export const addQuantity = (id: string) => {
  return {
    type: ADD_QUANTITY,
    id,
  };
};

export const subQuantity = (id: string) => {
  return {
    type: SUB_QUANTITY,
    id,
  };
};

export const removeItem = (id: string) => {
  return {
    type: REMOVE_ITEM,
    id,
  };
};

export const addOrder = (request: string) => {
  return {
    type: ADD_ORDER,
    request,
  };
};

export const purchase = () => {
  return {
    type: PURCHASE,
  };
};

export const addRequest = (request: string) => {
  return {
    type: ADD_REQUEST,
    request,
  };
};
