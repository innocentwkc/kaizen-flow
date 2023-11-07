# Kaizen Flow

Kaizen Flow is a robust web application designed to streamline workflow and productivity. Built with Vue 3, it incorporates a suite of tools and libraries to provide a seamless user experience.

## Table of Contents
- [Kaizen Flow](#kaizen-flow)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Author](#author)
  - [Scripts](#scripts)
    - [start](#start)
    - [web-app](#web-app)
    - [build](#build)
    - [preview](#preview)
    - [server](#server)
    - [test:unit](#testunit)
    - [test:e2e](#teste2e)
    - [test:e2e:dev](#teste2edev)
    - [build-only](#build-only)
    - [type-check](#type-check)
  - [Dependencies](#dependencies)

## Introduction
<a id="introduction"></a>
Welcome to the "Kaizen Flow" project, a web application designed for efficiency and productivity. This project leverages modern web technologies to create a seamless and dynamic user experience.

## Author
<a id="author"></a>
**Innocent W.K. Chinyemba**
- Email: [innocentwkc@gmail.com](mailto:innocentwkc@gmail.com)
- Website: [https://innocentwkc.com](https://innocentwkc.com)

## Scripts
<a id="scripts"></a>
Below are the scripts defined in the `package.json` file for various tasks required during development, testing, and deployment.

### start

<a id="start"></a>
Concurrently runs both the Vite development server and the Node.js server.

```bash
npm run start
```

### web-app
<a id="web-app"></a>
Starts the Vite development server for the front-end application.
```bash
npm run web-app
```

### build

<a id="build"></a>
Runs the build-only script to create a production build of the application.

```bash
npm run build
```

### preview

<a id="preview"></a>
Serves the production build locally for preview purposes.

```bash
npm run preview
```

### server

<a id="server"></a>
Launches the Node.js server found in the server/server.js file.

```bash
npm run server
```



### test:unit

<a id="testunit"></a>
Executes unit tests using Vitest.

```bash
npm run test:unit
```


### test:e2e

<a id="teste2e"></a>
Runs end-to-end tests by starting the preview server and then executing Cypress tests.

```bash
npm run test:e2e
```


### test:e2e:dev

<a id="teste2edev"></a>
Runs end-to-end tests in development mode by starting the development server and opening Cypress in interactive mode.

```bash
npm run test:e2e:dev
```


### build-only

<a id="build-only"></a>
Builds the application for production deployment without running additional scripts.

```bash
npm run build-only
```
### type-check

<a id="type-check"></a>
Performs a TypeScript type check on the project.

```bash
npm run type-check
```

## Dependencies

<a id="dependencies"></a>
A list of production dependencies required for the application to run. These include frameworks, libraries, and other tools used in the project.
DevDependencies

<a id="devdependencies"></a>
Development dependencies are required only during the development process, not in the production environment. This includes testing frameworks, build tools, and other utilities.
Contributing

<a id="contributing"></a>
Contributions are always welcome! If you're interested in contributing, please read the contributing guide and follow the project's code of conduct.


