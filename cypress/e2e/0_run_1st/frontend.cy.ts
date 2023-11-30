describe('Home Page Test', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('has a working search input', () => {
    cy.get('input[type="search"]').should('exist');
    cy.get('input[type="search"]').type('Sample search{enter}');
    // Add assertions based on how your app handles search input
  });

  it('has a navigation sidebar with links', () => {
    cy.get('nav').should('exist');
    cy.get('a[href="/"]').should('contain', 'Dashboard');
    cy.get('a[href="/calender"]').should('contain', 'Calender');
    cy.get('a[href="/uploads"]').should('contain', 'Uploads');
    // Continue with other links as needed
  });

  it('contains a main section with a form to upload PDF', () => {
    cy.get('main').should('exist');
    cy.get('main').find('form').should('exist');
    cy.get('input[type="file"]').should('exist');
    cy.get('input[type="file"]').should('have.attr', 'accept', '.pdf');
    cy.get('button[type="submit"]').should('contain', 'Upload PDF');
  });

  // Add more tests as needed for other elements or interactions
  
});



