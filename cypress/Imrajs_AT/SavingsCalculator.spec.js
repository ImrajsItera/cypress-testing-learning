/// <reference types="cypress" /> 

//referencia, pomoze doplnit co chceme

//import kniznice
var randomEmail = require('random-email');

it.only('random email', () => {
    cy.log(randomEmail({domain: 'imrisko.com'}))
})
//zabalime konstanty
const savingInfo = {
    email:'imrajs@imrisko.sk',
    fund: 'Death Star real estate',
    investment: 15000,
    years: 34
}

beforeEach(function () {
     cy.visit('/savingscalculator.php')
     
 });

it('Should calculate total income', ()=>{
    //2. vyberiem fond
    cy.get('#fundSelect').select('Death Star real estate')
    //3. zadam investiciu
    cy.get('#oneTimeInvestmentInput').type('15000')
    //3b pocet rokov 
    cy.get('#yearsInput').type('34')
    //4. kliknem na calculate
    cy.get('[data-test=calculate]').click()
    //ak nemam data-test tak hladam podla textu cy.contains('Calculate').click()
    //5. overim ze total income nie je prazdne a obsahuje "kr" ako menu
    cy.get('div.result') //chod na classu result
        .find('div') // najdi vsetky div v classe
        .eq(0) //zober prvy div
        .find('p') // najdi v nom <p>
        .should('not.be.empty')
        .and('contains.text', 'kr')
        .and('be.visible')
        //alternativa cy.get(".result div:eq(0) p").should("be.visible")    
})

it('Savings request my', ()=>{
    const email = 'imrajs@imrisko.sk' //nevieme do nej vlozit novu hodnotu
    //let email = 'imrajs@imrisko.sk' mozem to menit
   
        //2. vyberiem fond
        cy.get('#fundSelect').select('Death Star real estate')
        //3. zadam investiciu
        cy.get('#oneTimeInvestmentInput').type('15000')
        //3b pocet rokov 
        cy.get('#yearsInput').type('34')
        cy.get('#emailInput').type(email)
        cy.get('[data-test=apply-for-saving]').click()
        cy.contains('detail').click()
        cy.get('div.modal-body')
        cy.contains('Contact')
        .should('not.be.empty')
        .and('contains.text', email)                
})      

it('Savings request Furbo', ()=>{
        cy.log(savingInfo)   
        enterSavingsData(savingInfo) //volam funkciu s datami 
        
        cy.get('[data-test=apply-for-saving]').click()
//ak by sme mali viac requestov toto zoberie prvy, ale zbehne aj ked je len jeden       
        cy.get('ul.saving-list')
            .find('li')
            .first()//eq(0)
            .contains('detail')
            .click()
//hladame email 
        cy.get('div.modal-body')
            .should('be.visible')
            .find('p')
            .contains('Contact')
            .find('span')
            .should('have.text',savingInfo.email)
// Riesenie Natal
//cy.get(".saving-detail button").contains("detail").eq(0).click()
//cy.get("p").contains("Contact").find("span").should("have.text", mail)
});

//domaca uloha
it('should clear inputs after saving request is created', () => {
    enterSavingsData(savingInfo)
    cy.get('#oneTimeInvestmentInput')
        .should('have.value', '')
        .and('be.empty')
        .and('have.attr', 'placeholder', 'One time investment')
    
});

function enterSavingsData(savingInfo) {

    cy.get('#fundSelect').select(savingInfo.fund)
    cy.get('#oneTimeInvestmentInput').type(savingInfo.investment)
    cy.get('#yearsInput').type(savingInfo.years)
    cy.get('#emailInput').type(savingInfo.email)
}