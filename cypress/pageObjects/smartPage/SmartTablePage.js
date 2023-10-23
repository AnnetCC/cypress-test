import {BasePage} from "../BasePage";

export default class SmartTablePage extends BasePage {
  constructor() {
    super("/smart-table");
  }

  addNewUser(){
    // cy.get(".add").click()
    // cy.get(".id").type("value")
    //...
  }

  editUser(id){
    // click edit button
    // cy.get(".add").click()
    // cy.get(".id").type("value")
    //...
  }

  verifyUserData(rowNumber){
    // find by rowNumber , check all td (cells)
  }
}
