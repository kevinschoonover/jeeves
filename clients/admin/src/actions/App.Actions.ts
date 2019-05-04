import { IAppAction, ActionType } from './Helpers';
import { match } from 'react-router';
import { Utility } from '../state/Utility';
import { Alert } from '../state/Alert';
import { Spinner } from '../state/Spinner';
import { Account } from '../state/Account';

export interface IApplicationProps {
  openDrawer: () => IAppAction;
  closeDrawer: () => IAppAction;
  showPopup: (alert: Alert) => IAppAction;
  closePopup: () => IAppAction;
  showSpinner: (message: string) => IAppAction;
  hideSpinner: () => IAppAction;
  login: (data: any) => IAppAction;
  logout: () => IAppAction;
  createAccount: (content: any) => any;
  getAccount: (id: any) => any;
  fetchAccounts: (context?: any) => any;
  updateAccount: (context: any) => any;
  deleteAccount: (context: any) => any;
  createMaterial: (content: any) => any;
  getMaterial: (id: any) => any;
  fetchMaterials: (context?: any) => any;
  updateMaterial: (context: any) => any;
  deleteMaterial: (context: any) => any;
  getMail: (id: any) => any;
  fetchMails: (context?: any) => any;
  updateMail: (context: any) => any;
  deleteMail: (context: any) => any;
  fetchRestaurants: (context?: any) => any;
  updateRestaurant: (context: any) => any;
  deleteRestaurant: (context: any) => any;
  createRestaurant: (context: any) => any;
  fetchMenus: (context?: any) => any;
  updateMenu: (context: any) => any;
  deleteMenu: (context: any) => any;
  createMenu: (context: any) => any;
  // reservations
  fetchReservations: (context?: any) => any;
  updateReservation: (context: any) => any;
  deleteReservation: (context: any) => any;
  createReservation: (context: any) => any;
  reservations: any[];

  // inventoryItems
  fetchInventoryItems: (context?: any) => any;
  updateInventoryItem: (context: any) => any;
  deleteInventoryItem: (context: any) => any;
  createInventoryItem: (context: any) => any;
  inventoryItems: any[];

  // menuItems
  fetchMenuItems: (context?: any) => any;
  updateMenuItem: (context: any) => any;
  deleteMenuItem: (context: any) => any;
  createMenuItem: (context: any) => any;
  menuItems: any[];

  // sections
  fetchSections: (context?: any) => any;
  updateSection: (context: any) => any;
  deleteSection: (context: any) => any;
  createSection: (context: any) => any;
  sections: any[];

  // tables
  fetchTables: (context?: any) => any;
  updateTable: (context: any) => any;
  deleteTable: (context: any) => any;
  createTable: (context: any) => any;
  tables: any[];

  // orders
  fetchOrders: (context?: any) => any;
  updateOrder: (context: any) => any;
  deleteOrder: (context: any) => any;
  createOrder: (context: any) => any;
  orders: any[];

  // reviews
  fetchReviews: (context?: any) => any;
  updateReview: (context: any) => any;
  deleteReview: (context: any) => any;
  createReview: (context: any) => any;
  reviews: any[];

  // services
  fetchServices: (context?: any) => any;
  updateService: (context: any) => any;
  deleteService: (context: any) => any;
  createService: (context: any) => any;
  services: any[];

  // shifts
  fetchShifts: (context?: any) => any;
  updateShift: (context: any) => any;
  deleteShift: (context: any) => any;
  createShift: (context: any) => any;
  shifts: any[];

  // transactions
  fetchTransactions: (context?: any) => any;
  updateTransaction: (context: any) => any;
  deleteTransaction: (context: any) => any;
  createTransaction: (context: any) => any;
  transactions: any[];

  // visits
  fetchVisits: (context?: any) => any;
  updateVisit: (context: any) => any;
  deleteVisit: (context: any) => any;
  createVisit: (context: any) => any;
  visits: any[];

  // HERE: add
  match: match<any>;
  location: any;
  history: any;
  utility: Utility;
  authentication: Account;
  accounts: any;
  materials: any;
  mail: any[];
  restaurants: any[];
  menus: any[];
  materialCharts: Array<{ name: string; value: number; fill: string }>;
}

export const openDrawer = (): IAppAction => {
  return {
    type: ActionType.OPEN_DRAWER,
  };
};

export const closeDrawer = (): IAppAction => {
  return {
    type: ActionType.CLOSE_DRAWER,
  };
};

export const showPopup = (data: Alert): IAppAction => {
  return {
    type: ActionType.OPEN_ALERT,
    payload: data,
  };
};

export const closePopup = (): IAppAction => {
  return {
    type: ActionType.CLOSE_ALERT,
  };
};

export const showSpinner = (message: string): IAppAction => {
  return {
    type: ActionType.OPEN_SPINNER,
    payload: new Spinner({ message }),
  };
};

export const hideSpinner = (): IAppAction => {
  return {
    type: ActionType.CLOSE_SPINNER,
  };
};

export const login = (data: any): IAppAction => {
  return { type: ActionType.LOGIN_REQUEST, payload: data };
};

export const logout = (): IAppAction => {
  return { type: ActionType.LOGOUT_REQUEST };
};
