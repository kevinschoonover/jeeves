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
  total: 0,
};

const cartReducer = (state: any = initState, action: any) => {
  if (action.type === ADD_TO_CART) {
    const addedItem = state.items.find(
      (item: { id: string }) => item.id === action.id
    );
    if (addedItem) {
      addedItem.quantity = addedItem.quantity + 1;
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
      total: state.total,
    };
  }
};

export default cartReducer;
