// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
export {};

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            addUser(...arguments: string[]): Chainable<void>;

            filterUser(filter: any): Chainable<JQuery<HTMLElement>>;

            findUserByFilter(...arguments: string[]): Chainable<any[]>;

            login(email: any, password: any, rememberMe: any): Chainable<void>;

            modifyUser(filterData: any, modifyData: any): Chainable<void>;

            setUserData(data: any): Chainable<void>;

            verifyRequest(...arguments): Chainable<Response<any>['body']>;
        }
    }
}

// Alternatively you can use CommonJS syntax:
// require('./commands')
