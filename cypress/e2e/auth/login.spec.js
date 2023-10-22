import {login} from "../../utils/auth";
import {LoginPage} from "../../pageObjects/auth/LoginPage";

describe("Log in", ()=>{
  // it('should login with valid credentials', () => {
  //   cy.visit("auth/login")
  //
  //   cy.get("form input#input-email").type("staran@test.com", { delay: 50})
  //   cy.get("form input#input-password").type("Password1234", { delay: 50})
  //
  //   cy.get('form .custom-checkbox').click()
  //
  //   cy.get('form button[status="primary"]').click()
  //   cy.url().should('contain', '/pages')
  // });

  // it('should login with valid credentials', () => {
  //   login("staran@test.com", "lasjdljiashbdliasb", true)
  // });

  // it('should login with valid credentials', () => {
  //   cy.login("staran@test.com", "lasjdljiashbdliasb", true)
  // });

  it('should login with valid credentials', () => {
    const loginPage = new LoginPage()

    loginPage.navigate()
    loginPage.login("staran@test.com", "lasjdljiashbdliasb", true)
    // loginPage.fill("staran@test.com", "lasjdljiashbdliasb", true)
    // loginPage.clickLoginButton()

    // cy.get('input[type=file]').selectFile('cypress/assets/test.txt')
  });
})
