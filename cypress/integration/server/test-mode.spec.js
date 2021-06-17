describe('The Home Page', () => {
  beforeEach(() => {
    // Run development server and client in test mode
    cy.exec('npm run migrate-down-test');
    cy.exec('npm run migrate-up-test');
    cy.exec('npm run data-import-test');
  });

  it('successfully loads', () => {
    cy.visit('/');
  });
});
