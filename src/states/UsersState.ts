import { atom } from 'recoil';

export interface User {
    email_id: string;
    user_id: string;
    name: string;
    company: string;
    designation: string;
    country: string;
    company_type: string;
    phone_number: string;
    role: string;
    status: string;
    last_login: string;
    profile_picture?: string;
    initial?: string;
    userHSL?: any;
}
export const usersState = atom({
    key: 'users',
    default: [] as User[],
});

export const loggedUserState = atom({
    key: 'loggedUser',
    default: {} as User
});

export const userCurrencyState = atom({
    key: 'userCurrency',
    default: localStorage.getItem('currency')  || ''
});