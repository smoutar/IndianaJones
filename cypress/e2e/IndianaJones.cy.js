context('Automation of testing the Indiana Jones test site', () => {
  describe('Finding hidden secrets', () => {

    const username = "Arne"
    const hiddenSecret = "You have found a hidden secret!"

    it('Happy path', () => {
      cy.visit('http://ui-training-application.s3-website-eu-west-1.amazonaws.com')

      cy.get('#start-button').click()
      cy.contains('Start your journey').click()
      cy.contains('Ye sure starting here?').click()

      cy.get('#nameInput').type(username).type('{enter}')

      cy.get('#yes').click()

      cy.visit('http://ui-training-application.s3-website-eu-west-1.amazonaws.com/fourth-page', { failOnStatusCode: false })

      cy.get('#img').click(740, 200)

      cy.clearAllLocalStorage()
    })

    it('Leaving a field open', () => {
      cy.visit('http://ui-training-application.s3-website-eu-west-1.amazonaws.com')

      cy.get('#start-button').click()
      cy.contains('Start your journey').click()
      cy.contains('Ye sure starting here?').click()

      cy.get('#nameInput').type('{enter}')

      cy.contains(hiddenSecret).should('be.visible')
    })

    it('Too long name ', () => {
      cy.visit('http://ui-training-application.s3-website-eu-west-1.amazonaws.com')

      cy.get('#start-button').click()
      cy.contains('Start your journey').click()
      cy.contains('Ye sure starting here?').click()

      cy.get('#nameInput').type(username.repeat(6)).type('{enter}')

      cy.contains(hiddenSecret).should('be.visible')
    })

    it('Same name', () => {
      cy.visit('http://ui-training-application.s3-website-eu-west-1.amazonaws.com')

      cy.get('#start-button').click()
      cy.contains('Start your journey').click()
      cy.contains('Ye sure starting here?').click()

      cy.get('#nameInput').type("Bug Bounty Buccaneer").type('{enter}')

      cy.contains(hiddenSecret).should('be.visible')
    })

    it('Sneaky', () => {
      cy.visit('http://ui-training-application.s3-website-eu-west-1.amazonaws.com/third-page', { failOnStatusCode: false })

      cy.contains(hiddenSecret).should('be.visible')
    })

    it('Go further', () => {
      cy.visit('http://ui-training-application.s3-website-eu-west-1.amazonaws.com/sixth-page', { failOnStatusCode: false })

      cy.contains(hiddenSecret).should('be.visible')
    })

    it.skip('Sixth secret', () => {
      
    })

    it('Taking shortcuts', () => {
      cy.visit('http://ui-training-application.s3-website-eu-west-1.amazonaws.com')

      cy.get('#img').click(820, 120)

      cy.contains('expand_more').click()
    })

  })
})