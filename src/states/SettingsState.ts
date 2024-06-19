import { atom } from "recoil";

interface CompanyType {
    id: number;
    name: string;
    hq: string;
    company_size: number;
    website: string;
    no_of_users: number;
    description: string;
}
interface Role {
    id: number;
    name: string;
    description: string;
}
interface Country {
    id: number;
    code: string;
    name: string;
    description: string;
}
interface Language {
    id: number;
    code: string;
    name: string;
    is_active: boolean;
    description: string;
}
interface Currency {
    id: number;
    code: string;
    name: string;
    symbol: string;
    is_active: boolean;
    description: string | null;
}
interface Location {
    id: number;
    code: string;
    name: string;
    is_active: boolean;
    description: string | null;
}
export interface SettingsData {
    company_types: CompanyType[];
    roles: Role[];
    countries: Country[];
    languages: Language[];
    currencies: Currency[];
    locations: Location[];
}
export interface UserSettings {
    language: string;
    currency: string;
    location: string;
    email_notification: boolean;
}
export const AllSettingsState = atom({
    key: 'allSettings',
    default: {} as SettingsData,
});

export const UserSettingsState = atom({
    key: 'userSettings',
    default: {} as  UserSettings,
});