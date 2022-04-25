
it('should return correct data about a person',()=>{
    cy.request('https://swapi.dev/api/people/1').then(response=>{
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq('Luke Skywalker')
            expect(response.body.gender).to.eq('male')
            expect(response.body.mass).to.eq('77')
            expect(response.body.starships).to.have.length(2)
            expect(response.body.starships).to.have.length.greaterThan(1)
            expect(response.body.starships).to.have.lengthOf(2)

    })
});

