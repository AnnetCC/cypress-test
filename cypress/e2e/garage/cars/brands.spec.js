import brands from "../../../fixtures/garage/brands/brands.json"

describe("Garage page", ()=>{
  it('should return valid car brands', () => {
    cy.visit('/', {
      auth: {
        username: "guest",
        password: "welcome2qauto"
      }
    })

    cy.get("button").contains("Guest log in").click()

    cy.intercept('GET', '/api/cars/brands', brands ).as("getBrands")
    cy.get('.btn-primary').click()

    // cy.wait("@getBrands").then((req)=>{
    //   cy.wrap(req).its("request.headers").should("deep.include", {
    //     host: "qauto.forstudy.space"
    //   })
    // })

  });
})
