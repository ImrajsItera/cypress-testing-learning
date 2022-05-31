describe ("Funfon canvas", () => {
    
    
it("visit funfon demo page and play with it", ()=> {
    cy.visit("https://www.funfon.sk/smart-demo")
    cy.get('[id=didomi-notice-agree-button]').click()
    cy.get('canvas').click()
    cy.wait(3000)
    
    cy.get('canvas').trigger('mousedown', 580,100,).wait(500)
      .trigger('mousedown',580, 200).wait(500)
      .trigger('mousedown',580, 300).wait(500)
      .trigger('mousedown',580, 200).wait(500)
      .trigger('mousedown',580, 100).wait(500)
      .trigger('mousedown',580, 100).wait(1500),
      cy.get('canvas').toMatchImageSnapshot()
    cy.get('canvas').trigger('mousedown',300, 350).wait(1000)
      .trigger('mousedown',580, 100).wait(500)
      cy.get('canvas').toMatchImageSnapshot()
      cy.get('.next').click()
      cy.get('[id=demo-email').type('imrich.kubovic@itera.com')
      cy.get('.continuePop').click()    
})
})
