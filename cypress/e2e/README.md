# Cypress Test Structure

## Cypress Test Organization

In our Cypress test suite, we have adopted a structured approach to organize and execute our test files. This structure ensures that tests run in a specific order, which is particularly useful in scenarios where some tests need to be executed before others due to dependencies on the outcomes of previous tests.
Directory Structure

Our test files are organized into directories within the cypress/e2e/ folder, with each directory prefixed with a number and a description indicating the intended execution order:

    0_run_1st/: This directory contains test files that should run first in the test suite. These are typically foundational tests that set up the application state required for subsequent tests. Example: home.cy.ts.

    1_run_2nd/: This directory is for tests that should run after the initial set of tests. These often include more detailed testing scenarios or depend on the setup completed by earlier tests. Example: apis.cy.ts.

## Rationale

This structure was chosen to:

1. Ensure Test Order: Guarantee the execution of tests in a specific sequence, especially important when some tests are prerequisites for others.
2. Improve Readability: Provide a clear and understandable structure, making it easier for new team members to navigate the test suite
3. Facilitate Maintenance: Simplify the addition of new tests or reordering of existing ones by adjusting the directory or file names.

## Best Practices

> Independence: While this structure facilitates ordered execution, each test should be as independent as possible to avoid brittleness.

> Documentation: When adding new tests, document their purpose and any dependencies clearly in the test files or accompanying documentation.

## Conclusion

This structured approach to organizing Cypress tests helps maintain an orderly and efficient testing process, ensuring critical tests run first and building a solid foundation for subsequent testing activities.