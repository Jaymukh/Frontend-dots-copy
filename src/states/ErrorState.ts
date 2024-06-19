import { atom } from 'recoil';

export type ErrorType = {
    type: string;
    message: string;
};

export const errorState = atom<ErrorType | null>({
    key: 'errorState',
    default: null,
});