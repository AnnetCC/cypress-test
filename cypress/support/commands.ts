// <reference types='cypress' />
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

Cypress.Commands.add('filterUser', function (filter) {
    cy.get('table tr.ng2-smart-filters').find('th')
        .find('input-filter').find('input')
        .each(($filterField, $index) => {
            cy.wrap($filterField).clear().should('be.empty');
            if (filter[$index]) {
                cy.wrap($filterField).type(filter[$index], {delay: 50});
            }
        });
    return cy.get('table tbody tr.ng-star-inserted').first();
});
Cypress.Commands.add('setUserData', function (data) {
    cy.get('table tr.ng-star-inserted').find('td')
        .find('input-editor')
        .find('input').each(($field, $index) => {
        if (data[$index]) {
            cy.wrap($field).clear().type(data[$index], {delay: 50});
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
    const userInfo = [];

    cy.filterUser(filterData).find('td').find('ng2-smart-table-cell')
        .each(($el) => {
            userInfo.push($el.text());
        });
    return cy.wrap(userInfo);
});

Cypress.Commands.add('modifyUser', function (filterData, modifyData) {
    cy.filterUser(filterData).then($el => {
        cy.wrap($el).find('td').find('a.ng2-smart-action-edit-edit').click().then(() => {
            cy.setUserData(modifyData);
        });
        cy.get('table tbody tr.ng-star-inserted').find('td')
            .find('a.ng2-smart-action-edit-save').click();
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

    Cypress.Commands.add('verifyRequest', function (request, expectedStatus, isNegative) {
        cy.request(request)
            .then(response => {
                if (isNegative) {
                    cy.wrap(response).its('status').should('equal', expectedStatus);
                    return;
                }
            cy.wrap(response).its('status').should('equal', expectedStatus);
            return cy.wrap(response).its('body');
        });
    });
