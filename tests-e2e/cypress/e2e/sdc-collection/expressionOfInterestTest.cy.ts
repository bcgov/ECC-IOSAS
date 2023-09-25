import {Selectors} from "../../support/selectors";

before(() => {
    cy.visit('/');
    cy.login();
})

describe('IOSAS Expression OF Interest test', () => {
    it('Create new EOI - Happy Path', () => {
        const selectors = new Selectors();
        cy.contains('button', 'Create new EOI').click();


       cy.contains('label', 'No').click()
       cy.get('input[id="iosas_schoolauthorityname"]').clear().type('Cypress test authority')
       cy.get('input[id="iosas_authorityaddressline1"]').clear().type('Address line 1')
       cy.get('input[id="iosas_authorityaddressline2"]').clear().type('Address line 2')
       cy.get('input[id="iosas_authoritycity"]').clear().type('Victoria')
       cy.get('input[id="iosas_authoritypostalcode"]').clear().type('V8V3Y6')

       cy.contains('label', 'Yes').click()
       cy.get('input[id="iosas_proposedschoolname"]').clear().type('Cypress test school')
       cy.contains('label', 'No').click()

       cy.get('input[id="iosas_website"]').clear().type('www.cypress.io')
       cy.contains('label', 'Group 4').click()


    //    cy.get('input[id="iosas_startgrade"]').parent().click()
    //    cy.get('li').first().click({force: true})

    //    cy.get('input[id="iosas_endgrade"]').parent().click() 
    //     cy.get('li').eq(5).click({force: true})

       cy.contains('button', 'Save Draft').click();
    })
})