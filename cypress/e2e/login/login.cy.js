describe('Test login form', () => {

    before(function () {
        cy.visit('auth/login');
    });

    it('should login user and go to the main page', () => {
        cy.login('annahritskova@gmail.com', 'password1', true);
    });
});

