
 before(function () {
    // runs once before the first test in this block
    cy.log('Ja bezim jeden krat pred vsetkymi testami')
  });

  beforeEach(function () {
    // runs before each test in this block
    cy.log('Ja bezim pred kazdym testom')
    cy.visit('/gosslingator.php')
  });



it('Add one Ryan', ()=>{
  // najdem tlacidlo Ryan! a kliknem nan
   addRyan()
//overim pocitadlo ryanov
    cy.get('#ryanCounter').should('have.text','1')
    cy.get('div.ryan-counter h3').should('have.text','ryan')
    cy.get('div.ryan-counter')
        .find('h3')
        .should('have.text','ryan')
//overim ze sa ryan pridal
    cy.get('ul img')
        .should('be.visible')
        .and('have.attr','src','gosslingator/assets/ryan.png') //and = should
    });

 //overenie dvoch ryanov
it('Add two Ryans', ()=>{
        addRyan()
        addRyan()
        cy.get('#ryanCounter').should('have.text','2')
        cy.get('div.ryan-counter h3').should('have.text','ryans')
        cy.get('div.ryan-counter')
            .find('h3')
            .should('have.text','ryans')
        cy.get('ul img').should('have.length', 2) //pocitame kolko img sa zobrazilo

    });

 //overenie, ze kliknutim hlava ryana zmizne
it('Click on Ryans head it disapears', ()=>{
        addRyan()
        cy.get('ul img').click({force: true})
        cy.get('ul img').should('not.exist')
        cy.get('#ryanCounter').should('have.text','0')
            cy.get('div.ryan-counter h3').should('have.text','ryans')
            cy.get('div.ryan-counter')
                .find('h3')
                .should('have.text','ryans')
    });

//Overeie hlavny titulok stranky
it('Page Header' , ()=> {
     cy.get('h1.ryan-title') //najdi h1 element co ma ryantitle classu
        .should('have.text', 'Goslingate me')
        .and('be.visible')
    });
     
//over 0 klikov po otvoreni stranky
it('Zero Ryans on first opening' , ()=> {
    cy.get('#ryanCounter').should('have.text','0')
    cy.get('div.ryan-counter h3').should('have.text','ryans')
    cy.get('div.ryan-counter')
        .find('h3')
        .should('have.text','ryans')
    });

//funkcia na pridanie Ryana aby sme nemuseli to cele pisat vela krat  
function addRyan(){
    cy.log('Adding one Ryan')
    cy.get('#addRyan').click()
}

it('Should display correct text on remove ryan button and be disabled', ()=>{
    cy.get('#removeRyan').should('contain.text','Ryan out!' )
    .and('be.disabled')
})

it('Should display correct text on add ryan button', ()=>{
    cy.get('#addRyan').should('contain.text','Ryan!' )
})