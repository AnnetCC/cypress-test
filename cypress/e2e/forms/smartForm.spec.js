describe("Smart form page", ()=>{
  it('should display valid users', () => {
    cy.visit('pages/tables/smart-table')

    const expectedUsers = [
      {
        "id": "1",
        "firstName": "Mark"
      },
      {
        "id": "2",
        "firstName": "Jacob"
      },
      {
        "id": "3",
        "firstName": "Larry"
      },
      {
        "id": "4",
        "firstName": "John"
      },
      {
        "id": "5",
        "firstName": "Jack"
      },
      {
        "id": "6",
        "firstName": "Ann"
      },
      {
        "id": "7",
        "firstName": "Barbara"
      },
      {
        "id": "8",
        "firstName": "Sevan"
      },
      {
        "id": "9",
        "firstName": "Ruben"
      },
      {
        "id": "10",
        "firstName": "Karen"
      }
    ]
    const users = []
    cy.get("table tbody tr.ng-star-inserted").each(($el)=>{
      cy.wrap($el).find('td').then(($cells)=>{
        const user = {
          id: $cells.eq(1).text(),
          firstName: $cells.eq(2).text(),
        }

        users.push(user)
      })
    }).then(()=>{
      cy.log(users)
      cy.wrap(users).should('deep.equal', expectedUsers)
    })


  });

  it("find by id", ()=>{
    cy.visit('pages/tables/smart-table')
    cy.get("table tbody tr.ng-star-inserted").find("td").filter(':contains("5")').last().parent().find("a.ng2-smart-action-edit-edit").click()
  })
})
