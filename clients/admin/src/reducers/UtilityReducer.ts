import { IAppAction, ActionType } from './../actions/Helpers';

export const UtilityReducer = (state: any = {drawOpen: false, alert: null, spinner: null}, action: IAppAction): any => {
  switch (action.type) {
    case ActionType.OPEN_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: true
      });
    case ActionType.CLOSE_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: false
      });
    case ActionType.OPEN_ALERT:
      return Object.assign({}, state, {
        alert: action.payload
      });
    case ActionType.CLOSE_ALERT:
      return Object.assign({}, state, {
        alert: null
      });
    case ActionType.OPEN_SPINNER:
      return Object.assign({}, state, {
        spinner: action.payload
      });
    case ActionType.CLOSE_SPINNER:
      return Object.assign({}, state, {
        spinner: null
      });
    default:
      return state;
  }
};
