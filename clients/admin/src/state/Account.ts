import { Model } from "./Helpers";
import * as _ from 'lodash';

export interface IAccount {
    email?: string;
    name?: string;
    roles?: string[];
}

const AccountModel = Model<IAccount>({
    email: null,
    name: null,
    roles: null
});

export class Account extends AccountModel {
    public static EMAIL = 'email';
    public static NAME = 'name';
    public static ROLES = 'roles';

    public email: string;
    public name: string;
    public roles: string[];

    public isInRole(candidate: string) {
        return _.intersection(this.roles, [candidate]).length > 0;
    }
}
