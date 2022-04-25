/// <reference types="Cypress" />

it('should display price on result page', () => {
    cy.intercept('**/graphql?featureName=SearchReturnItinerariesQuery')
        .as('results')
    window.localStorage.setItem('bookingcom_extension_default', false)
    cy.setCookie('__kwc_agreed', 'true')
    cy.visit('https://www.kiwi.com/en')

    cy.get('[data-test="PlacePickerInput-destination"]')
        .find('[data-test="SearchField-input"]')
        .type('Tokyo')

    cy.get('[data-test="PlacepickerModalOpened-destination"]')
        .should('be.visible')
        .contains('London')
        .click()

    cy.get('[data-test="LandingSearchButton"]').click()
    cy.wait('@results')
    
   cy.wait(2000)
    //cy.get('[data-test="BookingButton"]').eq(0).click()
    cy.get('[data-test="ResultCardWrapper"]').first().contains('Select').click()
    cy.get('.ReservationBill-item-price').should('be.visible')

});
it.only('Same as previous test but shorter', () => {
    cy.setCookieConsent()
   //using api to go directly to the booking page via using token
   // cy.request('https://api.skypicker.com/flights?partner=cypress&fly_from=VIE&fly_to=LGW').then(response=>{
     cy.request({
         url:Cypress.env('flights_api'),
         qs:{
             partner:'cypress',
             fly_from: 'VIE',
             fly_to: 'LGW'
         }
     }) .then(response=>{  
        cy.log(response.body.data[0].booking_token)
        const flights = response.body.data
        expect(flights).to.have.length.greaterThan(0, 'it should find at least one flight')
        const selectedFlight = flights[0]
        //cy.visit('https://www.kiwi.com/en/booking?token='+ selectedFlight.booking_token)
        cy.visit({
            url:Cypress.env('booking_api'),
         qs:{
              token: selectedFlight.booking_token
         }
        })
        cy.get('.ReservationBill-item-price').should('be.visible')
    })
})
