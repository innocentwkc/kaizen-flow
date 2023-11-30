describe('API Endpoints Tests', () => {

  const apiBaseUrl = Cypress.env('apiBaseUrl');
  // Test cases for /get-uploads
  describe('/get-uploads endpoint', () => {
    it('Successfully retrieves file and directory list', () => {
      cy.request(`${apiBaseUrl}/api/get-uploads`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('fileList').that.is.an('array');
        expect(response.body).to.have.property('directoryList').that.is.an('array');
      });
    });

    // Additional test case for error handling can be added here
  });

  // Test cases for /get-resources
  describe('/get-resources endpoint', () => {
    it('Successfully retrieves resource list for type module', () => {
      cy.request(`${apiBaseUrl}/api/get-resources?type=module`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('fileList').that.is.an('array');
        expect(response.body).to.have.property('directoryList').that.is.an('array');
      });
    });

    it('Responds with error for invalid type parameter', () => {
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/api/get-resources?type=invalid`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });

    // Additional test cases for specific file retrieval and error handling can be added here
  });

  // Test cases for /upload
  describe('/upload endpoint', () => {
    it('Responds with error when no file is uploaded', () => {
      cy.request({
        method: 'POST',
        url: `${apiBaseUrl}/api/upload`,
        failOnStatusCode: false,
        body: {}
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });

    // Test case for successful file upload would require mocking or setting up file upload logic
  });

  // Test cases for /generate-ics
  describe('/generate-ics endpoint', () => {
    it(`Responds with error for non-existing JSON file`, () => {
      cy.request({
        method: 'POST',
        url: `${apiBaseUrl}/api/generate-ics`,
        failOnStatusCode: false,
        body: { filename: 'nonexistent.json' }
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    // Additional test case for successful ICS file generation can be added here
  });

  // Test cases for /get-ics-events/:filename
  describe('/get-ics-events/:filename endpoint', () => {
    it('Responds with error for non-existing ICS file', () => {
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/api/get-ics-events/nonexistent.ics`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    // Test case for successful ICS file retrieval can be added here
  });
});
