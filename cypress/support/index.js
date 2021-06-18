// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Activate theme
// require('cypress-dark/src/halloween');
require('cypress-dark');

const apiUrl = Cypress.env('apiUrl');

// Creates a user with email and password
// defined in cypress.json environment variables
// if the user already exists, ignores the error
// or given user info parameters
Cypress.Commands.add('registerUserIfNeeded', (options = {}) => {
  const defaults = {
    ...Cypress.env('user'),
  };
  const user = Cypress._.defaults({}, options, defaults);
  cy.request({
    method: 'POST',
    url: `${apiUrl}/api/users`,
    body: {
      ...user,
    },
    failOnStatusCode: false,
  });
});

// Login user via UI
Cypress.Commands.add('login', (user = Cypress.env('user')) => {
  cy.visit('/login');
  cy.contains('Email').type(user.email);
  cy.contains('Password').type(user.password);
  cy.get('.btn').contains('Login').click();

  // When we are logged in, there should be name visible
  // on nav bar
  cy.get('[data-target=dropdown1]')
    .contains(user.username)
    .should('be.visible');
});

// Get logged in token
Cypress.Commands.add('getToken', (user = Cypress.env('user')) => {
  return cy
    .request({
      method: 'POST',
      url: `${apiUrl}/api/users/login`,
      body: {
        email: user.email,
        password: user.password,
      },
      failOnStatusCode: false,
    })
    .its('body.token')
    .should('exist');
});

// Create a blog
Cypress.Commands.add('createBlog', () => {
  cy.getToken().then((token) => {
    const authorization = `Bearer ${token}`;

    const newBlog = {
      title: 'Test blog title',
      content: 'Test blog content',
    };

    const options = {
      method: 'POST',
      url: `${apiUrl}/api/blogs`,
      headers: {
        authorization,
      },
      body: {
        ...newBlog,
      },
    };

    cy.request(options).its('status').should('eq', 200);
  });
  ``;
});
