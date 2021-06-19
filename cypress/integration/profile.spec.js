/// <reference types="Cypress" />

describe('Profile', () => {
  beforeEach(() => {
    // Clean up database
    cy.exec('npm run migrate-down-test');

    // Setup database tabels
    cy.exec('npm run migrate-up-test');

    // Seed database
    cy.exec('npm run data-import-test');

    // Register a user
    cy.registerUserIfNeeded();

    // Login a user
    cy.login();
  });

  afterEach(() => {
    // Clean up database
    cy.exec('npm run migrate-down-test');
  });

  it('shows my profile', () => {
    cy.get('[data-target=dropdown1]').click();
    cy.contains('Profile').click();
    cy.get('#username').should('include.value', 'testuser');
    cy.get('#email').should('include.value', 'tester@test.com');
  });

  it('log out', () => {
    cy.get('[data-target=dropdown1]').click();
    cy.contains('Logout').click();
    cy.get('#nav-mobile').should('contain', 'Login');
  });

  it('can update my profile', () => {
    // New user name and email
    const username = 'update testuser';
    const email = 'updateuser@test.com';

    // Update user name and email
    cy.get('[data-target=dropdown1]').click();
    cy.contains('Profile').click();
    cy.get('#username').clear().type(username);
    cy.get('#email').clear().type(email);
    cy.get('.btn').contains('Update Profile').click();

    // Check for toast appear and disappear
    cy.wait(100);
    cy.get('.toast').should('contain', `User profile updated: ${username}`);
    cy.get('.toast').should('not.exist', { timeout: 2000 });

    // Check if the navbar update the user name
    cy.get('[data-target=dropdown1]').contains(username).should('be.visible');
  });
});
