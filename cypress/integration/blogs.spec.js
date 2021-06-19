describe('Blog', () => {
  beforeEach(() => {
    // Clean up database
    cy.exec('npm run migrate-down-test');

    // Setup database tabels
    cy.exec('npm run migrate-up-test');

    // Seed database
    cy.exec('npm run data-import-test');

    // Register a user
    cy.registerUserIfNeeded();

    cy.visit('/');
  });

  afterEach(() => {
    // Clean up database
    cy.exec('npm run migrate-down-test');
  });

  it('can read artile without logged in', () => {
    cy.get('.blog-link').should('contain', 'Read More');

    // Get the first element with read more
    cy.get('ul>li').contains('Read More').click();

    // Check the url
    cy.url().should('contain', '/blog');

    // Check the back button
    cy.get('.btn-back').should('be.visible');
  });

  it('can create a blog and read the created blog for logged in user', () => {
    cy.login();
    cy.wait(100);
    cy.get('#nav-mobile').contains('My Blogs').should('be.visible');
    cy.get('#nav-mobile').contains('My Blogs').click();
    cy.get('.alert')
      .contains(/No blogs created/)
      .should('be.visible');

    cy.get('[title="Add new blog"]').click();

    // Create a blog
    cy.contains('Blog Title').type('Test blog title');
    cy.contains('Blog Content').type('Test blog content');
    cy.contains('Preview').click();

    // In preview screen
    cy.contains('Test blog title').should('be.visible');
    cy.contains('Submit').click();

    // After submit
    cy.contains('Test blog title').should('be.visible');
    cy.get('.btn-back').click();

    // Check the new blog in my blogs
    cy.url().should('contain', '/myblogs');
    cy.contains('Test blog title').should('be.visible');
  });

  it('can update a blog for logged in user', () => {
    cy.createBlog();
    cy.login();
    cy.wait(100);
    cy.get('#nav-mobile').contains('My Blogs').click();

    // Check the new blog in my blogs
    cy.url().should('contain', '/myblogs');
    cy.contains('Test blog title').should('be.visible');

    // Edit the blog
    cy.get('.blog-link-edit').click();
    cy.url().should('contain', '/edit');

    cy.get('#blog-title').clear().type('update blog title');
    cy.get('#blog-content').clear().type('update blog content');

    cy.contains('Preview').click();
    cy.contains('Submit').click();

    cy.get('.btn-back').click();

    cy.contains('update blog title').should('be.visible');
  });

  it('can delete a blog for logged in user', () => {
    cy.createBlog();
    cy.login();
    cy.wait(100);

    cy.get('#nav-mobile').contains('My Blogs').click();
    cy.get('.blog-link-del').click();
    cy.url().should('contain', '/myblogs');
    cy.contains('Test blog title').should('not.exist');
  });
});
