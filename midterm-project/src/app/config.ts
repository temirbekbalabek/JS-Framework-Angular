import { InjectionToken, ValueProvider } from '@angular/core';

export const CONFIG = new InjectionToken('app.config');

export interface IConfig {
    title: string;
    maxItemsAllowed: number;
    authorization: string;
}

const config: Partial<IConfig> = {
    title: 'DI and HttpCleint',
    maxItemsAllowed: 500,
    authorization: localStorage.getItem('token'),

};

export const CONFIG_PROVIDER: ValueProvider = {
    provide: CONFIG,
    useValue: config,
};
