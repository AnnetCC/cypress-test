describe("Stepper page", {
  retries: 0,
  env: {
    stepper_url: "/pages/layout/stepper"
  }
},()=>{
  beforeEach(()=>{
    cy.visit(Cypress.env("stepper_url"))
  })

  it('Vertical stepper should display correct title on each step', () => {
    cy.get('nb-stepper[orientation="vertical"] h3').as("stepperTitle")
    cy.get('nb-stepper[orientation="vertical"] button').last().as("nextButton")

    cy.get("@stepperTitle").should('be.visible').and('have.text', "Step content #1").then(($el)=>{
      expect($el.text()).to.be.eq("Step content #1")
    })
    cy.get("@nextButton").click()

    cy.get("@stepperTitle").should('be.visible')
    cy.get("@stepperTitle").should('have.text', "Step content #2")
    cy.get("@nextButton").click()

    cy.get("@stepperTitle").should('have.text', "Step content #3")
    cy.get("@nextButton").click()

    cy.get("@stepperTitle").should('have.text', "Step content #4")
    cy.get("@nextButton").should('be.disabled')

    cy.get('@nextButton').matchImageSnapshot('next-button', {
      failureThreshold: 0.2,
      failureThresholdType: 'percent'
    })
  });

  it('Vertical stepper should display correct title on each step (XPATH)', () => {
   const titleSelector = '//nb-stepper[@orientation="vertical"]//h3'
   const nextButtonSelector = '//nb-stepper[@orientation="vertical"]//button[2]'

    cy.xpath(titleSelector).should('have.text', "Step content #1")
    cy.xpath(nextButtonSelector).click()

    cy.xpath(titleSelector).should('have.text', "Step content #2")
    cy.xpath(nextButtonSelector).click()

    cy.xpath(titleSelector).should('have.text', "Step content #3")
    cy.xpath(nextButtonSelector).click()

    cy.xpath(titleSelector).should('have.text', "Step content #4")
    cy.xpath(nextButtonSelector).should('be.disabled')
  });
})
