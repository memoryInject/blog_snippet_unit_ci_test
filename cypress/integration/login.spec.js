/// <reference types="Cypress" />

describe('BlogSnippet login', () => {
  before(() => {
    // Clean up database
    cy.exec('npm run migrate-down-test');

    // Setup database tabels
    cy.exec('npm run migrate-up-test');

    // Seed database
    cy.exec('npm run data-import-test');

    // Register a user
    cy.registerUserIfNeeded();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  after(() => {
    // Clean up database
    cy.exec('npm run migrate-down-test');
  });

  it('does not work with wrong credentials', () => {
    cy.contains('Login').click();

    cy.contains('Email').type('wrong@email.com');
    cy.contains('Password').type('no-such-user');

    cy.get('.btn').contains('Login').click();

    // Error message is shown and we remain on the login page
    cy.get('.alert').should('contain', 'User not found!');
    cy.url().should('contain', '/login');
  });

  it('logs in', () => {
    cy.contains('Login').click();

    const user = Cypress.env('user');
    cy.contains('Email').type(user.email);
    cy.contains('Password').type(user.password);
    cy.get('.btn').contains('Login').click();

    // Url is /
    cy.url().should('not.contain', '/login');
    cy.location('pathname').should('equal', '/');

    // When we are logged in, there should be name visible
    // and My Blogs on nav bar
    cy.get('[data-target=dropdown1]')
      .contains(user.username)
      .should('be.visible');

    cy.get('#nav-mobile').should('contain', 'My Blogs');
  });
});
