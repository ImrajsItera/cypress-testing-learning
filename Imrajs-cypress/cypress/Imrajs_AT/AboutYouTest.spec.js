
describe ("AboutYou homework", () => {
    Cypress.on("uncaught:exception",(err,runnable)=>{
        return false;
       
       
    });
    beforeEach(()=> {
         cy.clearLocalStorage();
         cy.clearCookies();
        
         cy.setCookie("OptanonAlertBoxCLosed", "2022-04-14T21:40:00.00Z")
         cy.visit('https://www.aboutyou.sk/?gender=male')
         cy.wait(2000)
         
    })
    it('Choose two items and add them into basket', ()=>{
       // cy.get('[id=onetrust-accept-btn-handler]').click()
        cy.get('[data-test-id=Label_Oblečenie]').click()
        cy.get('[data-testid=linkInactive-20324]').click()
        cy.wait(1500)
        cy.get('[data-testid=productTile-4254016]').click()
        //cy.get('[data-testid=productColorOptionsOption2]',{timeout:6000}).click()
        cy.get('[data-testid=sizeFlyout').click()
        cy.get('[data-testid=sizeOption_37233440_active]').click()
        cy.get('[data-testid=addToBasketButton]').click()
        
        
    }) 
})