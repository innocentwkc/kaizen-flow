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
    - [server](#server)
    - [test:e2e](#teste2e)
  - [Dependencies](#dependencies)

## Introduction
<a id="introduction"></a>
Welcome to the "Kaizen Flow" project, a web application designed for efficiency and productivity. This project leverages modern web technologies to create a seamless and dynamic user experience.

## Author
<a id="author"></a>

## Scripts
<a id="scripts"></a>
Below are the scripts defined in the `package.json` file for various tasks required during development, testing, and deployment.

### start

<a id="start"></a>
Concurrently runs both the Vite development server and the Node.js server.
Navigate to the application directory open your terminal and run the following

```bash
npm install
npm i -g concurrently
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

### server

<a id="server"></a>
Launches the Node.js server found in the server/server.js file.

```bash
npm run server
```

### test:e2e

<a id="teste2e"></a>
Runs end-to-end tests by starting the server and frontend and then executing Cypress tests.

```bash
npm run test:e2e
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


