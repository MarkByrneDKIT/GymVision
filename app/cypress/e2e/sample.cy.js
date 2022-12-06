<reference types = "cypress"/>

import Chance from 'chance';
import { cyan } from 'colorette';
import { beforeEach, it } from 'node:test';
const chance = new Chance();

describe('Firestarter',() => {

const email = chance.email();
const pass = 'ValidPassword123';

beforeEach(() => {
    cy.visit('http://localhost:3000');
})

it('has a title', () => {
    cy.contains('Welcome to Firestarter');
    expect(2).to.equal(2)
})

});