//<reference types='cypress' />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            filterUser(filter): Chainable<JQuery<HTMLElement>>;

            setUserData(data): Chainable<void>;

            addUser(...arguments): Chainable<void>;

            findUserByFilter(...arguments): Chainable<any[]>;

            modifyUser(filterData, modifyData): Chainable<void>;

            login(email, password, rememberMe): Chainable<void>;
        }
    }
}
Cypress.Commands.add('filterUser', function (filter) {
    cy.get('table tr.ng2-smart-filters').find('th')
        .find('input-filter').find('input')
        .each(($filterField, $index) => {
            cy.get($filterField).clear().should('be.empty');
            if (filter[$index]) {
                cy.get($filterField).type(filter[$index], {delay: 50});
            }
        });
    return cy.get('table tbody tr.ng-star-inserted').first();
});
Cypress.Commands.add('setUserData', function (data) {
    cy.get('table tr.ng-star-inserted').find('td')
        .find('input-editor')
        .find('input').each(($field, $index) => {
        if (data[$index]) {
            cy.get($field).clear().type(data[$index], {delay: 50});
        }
    });
});

Cypress.Commands.add('addUser', function () {
    const userData = [...arguments];
    cy.get('th.ng2-smart-actions-title-add a').last().click()
        .then(() => {
            cy.get('thead tr[class="ng-star-inserted"]').should('exist');
            cy.setUserData(userData);
        });
    cy.get('a.ng2-smart-action-add-create').click();
});
Cypress.Commands.add('findUserByFilter', function () {
    const filterData = [...arguments];
    let userInfo = [];

    cy.filterUser(filterData).find('td').find('ng2-smart-table-cell')
        .each(($el) => {
            userInfo.push($el.text());
        });
    return cy.wrap(userInfo);
});

Cypress.Commands.add('modifyUser', function (filterData, modifyData) {
    cy.filterUser(filterData).then($el => {
        cy.get($el).find('td').find('a.ng2-smart-action-edit-edit').click();
        cy.setUserData(modifyData);
        cy.get('table tbody tr.ng-star-inserted').find('td')
            .find('ng2-st-tbody-create-cancel').click();
    });
});

Cypress.Commands.add('login', function (email, password, rememberMe) {
    cy.get('form div.form-control-group').first().find('input').type(email);
    cy.get('form div.form-control-group').find('input[id="input-password"]').type(password);

    if (rememberMe) cy.get('form div.form-control-group nb-checkbox').find('span.custom-checkbox').click();

    cy.get('form div.form-control-group').each($el => {
        if ($el.find('p.status-danger').length) {
            cy.log($el.find('p.status-danger')[0].innerText);
        }
    });

    cy.get('form button').should('be.enabled').click();
    cy.url().should('equal', 'http://localhost:4200/pages');
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {Command} from '@angular/cli/models/command';
