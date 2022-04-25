describe.only("Search flow check", ()=>{
    before(()=>{
        //cy.contains('button','Accept').click()
        cy.log("Local Storage")
        localStorage.setItem("bookingcom_extension_default", false)
        cy.log("accept cookies")
        cy.setCookie('__kwc_agreed','true')
        cy.visit('https://www.kiwi.com/en/')

    })
    it('should check placepicker', ()=>{

        cy.intercept('GET',/featureName=UmbrellaPlacesQuery/).as('placesQuery')
        cy.log("type into destination")
        cy.get('[data-test=PlacePickerInput-destination]').type('Tokyo')
        cy.wait('@placesQuery')
        cy.log("select first occurrence")
        //moze sa to robit s timeout alebo pockat na API GET (intercept)
        //cy.get('[data-test=PlacePickerRow-wrapper]',{timeout:1000}).eq(0).click()
        cy.wait(1000)
        cy.get('[data-test=PlacePickerRow-wrapper]').eq(0).click()
        cy.get("[data-test=PlacePickerInput-destination]").should("contain.text", "Tokyo")
        cy.log("navigate to result page")
        // cy.contains('with Booking.com').click()
        //lepsi zapis predosleho
        cy.get("[data-test=LandingSearchButton]").click()
        cy.url().should('contain','search/results')
        cy.log('Wait for Results')
        cy.intercept('POST',/featureName=SearchReturnItinerariesQuery/).as('resultsQuery')
        cy.wait('@resultsQuery',{timeout:6000})
        cy.log('price is available')
        cy.get("[data-test=ResultCardPrice] strong span").should('be.visible')
        sessionStorage.clear()
    })
})

describe("Search flow check", ()=>{
    before(()=>{
        
        cy.log("accept cookies")
        //cy.contains('button','Accept').click()
        cy.setCookie('__kwc_agreed','true')
        window.localStorage.setItem('bookingcom_extension_default', true)
        cy.log("Local Storage")
        cy.visit('https://kiwi.com/en/')
       
        
    })

    it('should check placepicker', ()=>{
     
        cy.intercept('GET',/featureName=UmbrellaPlacesQuery/).as('placesQuery')
        
        cy.log("type into destination")
        cy.get('[data-test=PlacePickerInput-destination]').type('Tokyo')
        cy.wait('@placesQuery')  

        cy.log("select first occurrence")
        //moze sa to robit s timeout alebo pockat na API GET (intercept)
        //cy.get('[data-test=PlacePickerRow-wrapper]',{timeout:1000}).eq(0).click() 
        cy.wait(1000)
        cy.get('[data-test=PlacePickerRow-wrapper]').eq(0).click()
        cy.get("[data-test=PlacePickerInput-destination]").should("contain.text", "Tokyo")
       
        cy.log("navigate to result page")
       // cy.contains('with Booking.com').click()
        //lepsi zapis predosleho
        
        cy.get("[data-test=LandingSearchButton]").click()
        cy.url().should('contain','search/results')
       
        cy.log('Wait for Results')
        cy.intercept('POST',/featureName=SearchReturnItinerariesQuery/).as('resultsQuery')
        cy.wait('@resultsQuery',{timeout:6000})
        cy.log('price is available')
        cy.get("[data-test=ResultCardPrice] strong span").should('be.visible')
        localStorage.clear()
    })
})


describe("Search flow check Natal", ()=>{
    before(()=>{
        cy.log("accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        localStorage.setItem("bookingcom_extension_default", true)
        cy.visit("https://www.kiwi.com/en/")     
    })

    it("should check placepicker", ()=>{
        cy.log("spy on API")
        cy.intercept("GET", /featureName=UmbrellaPlacesQuery/).as("placesQuery")

        cy.log("type into destination")
        cy.get("[data-test=PlacePickerInput-destination] [data-test=SearchField-input]").type("Tokyo")
        //cy.wait("@placesQuery")
        cy.log("select first occurrence")
        cy.get("[data-test=PlacePickerRow-wrapper]").eq(0).click()
        //cy.get("[data-test=PlacePickerInput-destination]").should("contain.text", "Tokyo")
        
        cy.log("navigate to result page")
        cy.get("[data-test=LandingSearchButton]").click()
        cy.url().should("contain", "/search/results/")

        cy.log("wait for results")
        cy.intercept("POST", /featureName=SearchReturnItinerariesQuery/).as("results")
        cy.wait("@results", {timeout: 15000})
        cy.get("[data-test=ResultCardPrice] strong span").should("be.visible")
    })
})
