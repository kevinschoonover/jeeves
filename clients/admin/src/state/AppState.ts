import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

export interface IAppState {
  utility?: any;
  authentication?: any;
  accounts?: any;
  materials?: any;
  mail?: any;
  restaurants?: any;
  menus?: any;
  reservations?: any;
  inventoryItems?: any;
  menuItems?: any;
  sections?: any;
  tables?: any;
  // HERE: add
}

export const AppStateModel : IAppState = {
  utility: {drawOpen: false, alert: null, spinner: null},
  authentication: null,
  accounts: null,
  materials: null,
  mail: null,
  restaurants: null,
  menus: null,
  reservations: null,
  inventoryItems: null,
  menuItems: null,
  sections: null,
  tables: null,
  // HERE: add
};

export const isAuthenticated = connectedRouterRedirect({
  redirectPath: '/account/login',
  authenticatedSelector: (state: IAppState) => state.authentication !== null,
  wrapperDisplayName: 'Authenticated',
}) as any;
