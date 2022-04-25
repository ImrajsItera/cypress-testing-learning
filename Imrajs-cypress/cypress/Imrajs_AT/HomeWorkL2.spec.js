/// <reference types="Cypress" />

it.only('Fellowship: it displays complete when all the points are used', () => {
    cy.visit('http://furbo.sk/waw/fellowship.php')
    //TODO: zaklikni na stránke elementy s textom Frodo, Legolas, Gandalf, Aragorn
    const fellows = ['Frodo', 'Legolas', 'Gandalf', 'Aragorn']
    fellows.forEach(hero => cy.contains(hero).click())
    
    //bud vypisem kazdeho jedneho alebo riesenie vyssie
    //cy.contains('Frodo').click()
    cy.get('.points-left')
        .find('h3')
        .should('have.text', 'Complete')
});

it('Spelleology: it displays first spell', () => {
    cy.visit('http://furbo.sk/waw/spelleology.php')
    //TODO: nájdi prvy spell element pomocou funkcie eq() a otvor jeho detail
    cy.get('ul.spells')
        .find('li')
        .eq(0)
        .click()
    cy.get('.modal-container')
        .find('.modal-header')
        .should('have.text', 'Accio')
})

it('Spelleology: it displays last spell', () => {
    cy.visit('http://furbo.sk/waw/spelleology.php')
    //TODO: nájdi posledný spell element pomocou funkcie last() a otvor jeho detail
    cy.get('ul.spells')
        .find('li')
        .last()
        .click()
    cy.get('.modal-container')
        .find('.modal-header')
        .should('have.text', 'Wingardium Leviosa')
})