/// <reference types="cypress" />

import Chance from 'chance';

const chance = new Chance();

describe('My First Test', () => {
  it('Visits the memcards home page', () => {
    cy.visit('http://localhost:3000/');
  });

  it('should create a new deck', () => {
    const deckName = chance.animal({ type: 'desert' });
    const frontOfCard = chance.animal({ type: 'ocean' });
    const backOfCard = chance.animal({ type: 'forest' });

    cy.getByTestId('add-new-button').click();
    cy.get('a[href*="/add/newdeck').click();
    cy.get('input[name="deckName"]').type(deckName);
    cy.get('input[name="frontOfCard"]').type(frontOfCard);
    cy.get('input[name="backOfCard"]').type(backOfCard);
    cy.get('button[type="submit"]').click();
  });
});
