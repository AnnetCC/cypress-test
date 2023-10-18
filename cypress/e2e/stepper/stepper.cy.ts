describe('Test horizontal stepper', () => {
  it('Horizontal stepper should describe right title on each step', () => {
    cy.visit('/pages/layout/stepper');

    cy.get('nb-stepper[orientation="horizontal"] h3').as('stepper-title');
    cy.get('nb-stepper[orientation="horizontal"] button').last().as('next-button');

    cy.get('@stepper-title').should('have.text', 'Step content #1');
    cy.get('@next-button').click();
    cy.get('@stepper-title').should('have.text', 'Step content #2');

    cy.get('@next-button').click();
    cy.get('@stepper-title').should('have.text', 'Step content #3');

    cy.get('@next-button').click();
    cy.get('@stepper-title').should('have.text', 'Step content #4');
    cy.get('@next-button').should('be.disabled');
  });
});

