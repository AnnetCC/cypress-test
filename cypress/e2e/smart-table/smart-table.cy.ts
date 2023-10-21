describe('Test smart-table', {
    testIsolation: false,
}, () => {

    before(function () {
        cy.visit('/pages/tables/smart-table');
    });

    it('should create new user', () => {
        const expected = ['126', 'Anna', 'Hritskova', 'ann_55', 'annahritskova@gmail.com', '26'];

        cy.addUser('126', 'Anna', 'Hritskova', 'ann_55', 'annahritskova@gmail.com', '26');
        cy.findUserByFilter('', 'Anna', 'Hritskova').should('deep.equal', expected);
    });

    it('should modify user', () => {
        const expected = ['57', 'Marharyta', 'Koval', 'ann_55', 'annahritskova@gmail.com', '26'];

        cy.modifyUser(['', 'Anna', 'Hritskova'], ['57', 'Marharyta', 'Koval']);
        cy.findUserByFilter('57', 'Marharyta', 'Koval').should('deep.equal', expected);
    });
});

