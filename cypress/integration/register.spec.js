/// <reference types="Cypress" />

describe('Register', () => {
  beforeEach(() => {
    // Clean up database
    cy.exec('npm run migrate-down-test');

    // Setup database tabels
    cy.exec('npm run migrate-up-test');

    // Seed database
    cy.exec('npm run data-import-test');

    // Visit the site
    cy.visit('/');
  });

  afterEach(() => {
    // Clean up database
    cy.exec('npm run migrate-down-test');
  });

  it('registers new user', () => {
    const username = 'visitor';
    const email = 'visitor@email.com';
    const password = 'visiting';

    cy.contains('Login').click();
    cy.contains('Register').click();
    cy.location('pathname').should('equal', '/register');
    cy.contains('Username').type(username);
    cy.contains('Email').type(email);
    cy.contains('Password').type(password);
    cy.contains('Confirm Password').type(password);
    cy.get('.btn').contains('Register').click();

    cy.location('pathname').should('equal', '/');
    cy.get('[data-target=dropdown1]').contains(username).should('be.visible');
  });
});
