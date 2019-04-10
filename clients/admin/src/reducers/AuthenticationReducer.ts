import { IAppAction, ActionType } from './../actions/Helpers';

export const AuthenticationReducer = (state: any = null, action: IAppAction): any => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            return {email: action.payload.email, name: 'Goeme Nthomiwa', roles: ['Admin']};
        case ActionType.LOGOUT_REQUEST:
            return null;
        default:
            return state;
    }
};
