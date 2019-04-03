import menucards from '../menucards';
import { ADD_TO_CART } from '../actions/action-types/cart-actions';

const initState = {
  items: menucards,
  addedItems: [
    {
      id: 1,
      avatar: '1',
      title: 'Crab Rangoon',
      category: 'starter',
      subheader: 2.0,
      description:
        'Crab and cream cheese wontons pinched into little purses and deep fried.',
      details: 'CAL: 150',
      quantity: 3,
    },
  ],
  total: 6,
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
      let newItem = existedItem;
      newItem.quantity = 1;
      const newTotal = state.total + existedItem.subheader;
      return {
        ...state,
        addedItems: [...state.addedItems, newItem],
        total: newTotal,
      };
    }
  } else {
    return {
      ...state,
    };
  }
};

export default cartReducer;
