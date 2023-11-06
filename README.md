# Kaizen Flow

Kaizen Flow is a robust web application designed to streamline workflow and productivity. Built with Vue 3, it incorporates a suite of tools and libraries to provide a seamless user experience.

## Table of Contents
1. [Introduction](#introduction)
2. [Author](#author)
3. [Scripts](#scripts)
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
4. [Dependencies](#dependencies)
5. [DevDependencies](#devdependencies)
6. [Contributing](#contributing)

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


- [@fullcalendar/core](https://www.npmjs.com/package/@fullcalendar/core)
- [@fullcalendar/daygrid](https://www.npmjs.com/package/@fullcalendar/daygrid)
- [@fullcalendar/interaction](https://www.npmjs.com/package/@fullcalendar/interaction)
- [@fullcalendar/timegrid](https://www.npmjs.com/package/@fullcalendar/timegrid)
- [@fullcalendar/vue3](https://www.npmjs.com/package/@fullcalendar/vue3)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors)
- [express](https://www.npmjs.com/package/express)
- [ics](https://www.npmjs.com/package/ics)
- [moment](https://www.npmjs.com/package/moment)
- [multer](https://www.npmjs.com/package/multer)
- [pdf-text-extract](https://www.npmjs.com/package/pdf-text-extract)
- [pinia](https://www.npmjs.com/package/pinia)
- [vue](https://www.npmjs.com/package/vue)
- [vue-router](https://www.npmjs.com/package/vue-router)


<a id="devdependencies"></a>
Development dependencies are required only during the development process, not in the production environment. This includes testing frameworks, build tools, and other utilities.
Contributing

- [@tsconfig/node18](https://www.npmjs.com/package/@tsconfig/node18)
- [@types/jsdom](https://www.npmjs.com/package/@types/jsdom)
- [@types/node](https://www.npmjs.com/package/@types/node)
- [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue)
- [@vue/test-utils](https://www.npmjs.com/package/@vue/test-utils)
- [@vue/tsconfig](https://www.npmjs.com/package/@vue/tsconfig)
- [autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [cypress](https://www.npmjs.com/package/cypress)
- [jsdoc](https://www.npmjs.com/package/jsdoc)
- [jsdom](https://www.npmjs.com/package/jsdom)
- [kleur](https://www.npmjs.com/package/kleur)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)
- [postcss](https://www.npmjs.com/package/postcss)
- [sass](https://www.npmjs.com/package/sass)
- [start-server-and-test](https://www.npmjs.com/package/start-server-and-test)
- [tailwindcss](https://www.npmjs.com/package/tailwindcss)
- [typescript](https://www.npmjs.com/package/typescript)
- [vite](https://www.npmjs.com/package/vite)
- [vitest](https://www.npmjs.com/package/vitest)

<a id="contributing"></a>
Contributions are always welcome! If you're interested in contributing, please read the contributing guide and follow the project's code of conduct.


