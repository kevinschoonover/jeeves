import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

export interface IAppState {
  utility?: any;
  authentication?: any;
  users?: any;
  materials?: any;
  mail?: any;
  restaurants?: any;
}

export const AppStateModel : IAppState = {
  utility: {drawOpen: false, alert: null, spinner: null},
  authentication: null,
  users: null,
  materials: null,
  mail: null,
  restaurants: null,
};

export const isAuthenticated = connectedRouterRedirect({
  redirectPath: '/account/login',
  authenticatedSelector: (state: IAppState) => state.authentication !== null,
  wrapperDisplayName: 'Authenticated',
}) as any;
