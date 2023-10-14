describe('Test modal dialog appearance', () => {
  it('should open modal dialog with valid elements inside', () => {
    cy.visit('/pages/modal-overlays/dialog');

    cy.get('nb-card[class="form-input-card"] button').as('enter-button');
    cy.get('@enter-button').click();

    cy.get('ngx-dialog-name-prompt[class="ng-star-inserted"]').should('be.visible');

    cy.get('ngx-dialog-name-prompt[class="ng-star-inserted"] nb-card-header').should('have.text', 'Enter your name');
    cy.get('ngx-dialog-name-prompt[class="ng-star-inserted"] input').should('exist');
    cy.get('ngx-dialog-name-prompt[class="ng-star-inserted"] button').first().should('have.text', 'Cancel');
    cy.get('ngx-dialog-name-prompt[class="ng-star-inserted"] button').last().should('have.text', 'Submit');
  });
});

