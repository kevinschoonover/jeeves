import menucards from '../menucards';
import {
  ADD_TO_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  REMOVE_ITEM,
  ADD_TIP,
} from '../actions/action-types/cart-actions';

const initState = {
  items: menucards,
  addedItems: [],
  total: 0,
};

const cartReducer = (state: any = initState, action: any) => {
  if (action.type === ADD_TO_CART) {
    const addedItem = state.addedItems.find(
      (item: { id: string }) => item.id === action.id
    );
    const existedItem = state.items.find(
      (item: { id: string }) => item.id === action.id
    );
    if (addedItem) {
      addedItem.quantity += 1;
      const newTotal = state.total + addedItem.subheader;
      return {
        ...state,
        total: newTotal,
      };
    } else {
      const newItem = existedItem;
      existedItem.quantity += 1;
      const newTotal = state.total + existedItem.subheader;
      return {
        ...state,
        addedItems: [...state.addedItems, existedItem],
        total: newTotal,
      };
    }
  }
  if (action.type === ADD_QUANTITY) {
    const addedItem = state.addedItems.find(
      (item: { id: string }) => item.id === action.id
    );
    addedItem.quantity += 1;
    const newTotal = state.total + addedItem.subheader;
    return {
      ...state,
      total: newTotal,
    };
  }
  if (action.type === SUB_QUANTITY) {
    const addedItem = state.addedItems.find(
      (item: { id: string }) => item.id === action.id
    );
    addedItem.quantity -= 1;
    const newTotal = state.total - addedItem.subheader;
    return {
      ...state,
      total: newTotal,
    };
  }
  if (action.type === REMOVE_ITEM) {
    const itemRemove = state.addedItems.find(
      (item: { id: string }) => item.id === action.id
    );
    const newItems = state.addedItems.filter(
      (item: { id: string }) => action.id !== item.id
    );
    const newTotal = state.total - itemRemove.subheader * itemRemove.quantity;
    return {
      ...state,
      addedItems: newItems,
      total: newTotal,
    };
  }
  if (action.type === ADD_TIP) {
    const newTotal = state.total + action.tip;
    return {
      ...state,
      total: newTotal,
    };
  } else {
    return {
      ...state,
    };
  }
};

export default cartReducer;
