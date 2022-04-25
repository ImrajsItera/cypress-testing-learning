describe ("365Bank homework", () => {
    before(()=> {
         cy.visit('https://365.bank')
    })
    it("Test the basic flow on 365bank page", ()=>{
       cy.get('.btn-mint').contains('Akceptovať').click()
       cy.get('.floatingPanelLinkCalculator').click()
       cy.get('a[href*="hypotekarna-kalkulacka"]').click()
       cy.url().should("contain", "/kalkulacky/hypotekarna-kalkulacka")
       cy.get('input[name="estateValueInput"]').clear().type('300000')
       cy.get('input[name="mortgageValueInput"]').clear().type('180000')
       cy.get('input[name="durationInput"]').clear().type('20')
       cy.get('div').contains('3 roky').click()
       cy.get('.check__icon').click()
       cy.get('.monthlyPayment').should('contain.text', "828")
       cy.get('a[href*="/mam-zaujem/hypoteka/"]').click()
       cy.url().should("contain", "/mam-zaujem/hypoteka")
    })
})