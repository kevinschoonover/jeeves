import menucards from '../menucards';
import { ADD_TO_CART } from '../actions/action-types/cart-actions';

const initState = {
  items: menucards,
  addedItems: [],
  total: 0,
};

const cartReducer = (state: any, action: any) => {
  state = initState;
  if (action.type === ADD_TO_CART) {
    const addedItem = state.items.find(
      (item: { id: string }) => item.id === action.id
    );
    if (addedItem) {
      addedItem.quantity = 1;
      const newTotal = state.total + addedItem.subheader;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  } else {
    return {
      ...state,
      addedItems: [],
      total: state.total,
    };
  }
};

export default cartReducer;
