# React Firebase Admin ⚛️ 🚀

![ci](https://github.com/CreateThrive/react-firebase-admin/workflows/ci/badge.svg?branch=master)
[![license: MIT](https://badgen.net/github/license/micromatch/micromatch)](https://github.com/CreateThrive/react-firebase-admin/blob/feature/badges-rename-workflows/LICENSE.md)

Boilerplate with React ⚛️ and Firebase 🔥designed to quickly spin up a fully functional admin dashboard with authentication, authorization, realtime database, built-in CI/CD, file upload and more. We're using up to date industry standards and next-gen technologies like React (with hooks), redux, bulma, sass, webpack, routing and a serverless architecture.

![Boilerplate - Users page](https://imgur.com/7jIt6jh.png)

---

## Table of Contents

<!-- To update this table of contents, ensure you have run `npm install` then `npm run doctoc` -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is this?](#what-is-this)
- [Why should I use it?](#why-should-i-use-it)
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Core](#core)
  - [Unit Testing](#unit-testing)
  - [Linting](#linting)
  - [Cloud functions](#cloud-functions)
  - [Unit Testing](#unit-testing-1)
- [Prerequisites](#prerequisites)
- [Documentation](#documentation)
- [Demo](#demo)
- [Contributors](#contributors)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

This project is using a customized version ported into React of the [Admin Dashboard Template](https://github.com/vikdiesel/admin-one-bulma-dashboard) made by [Viktor Kuzhelny](https://github.com/vikdiesel).

## What is this?

React Firebase Admin is our in-house admin dashboard boilerplate, used in many of our software projects here at [CreateThrive](https://createthrive.com/). After months of hard work, we decided to make it public and support the open source community.

## Why should I use it?

- This project was bootstrapped with CRA (Create React App), this means it comes with all the good features we all know and love such as built-in scripts, to make our app a PWA (Progressive Web App) and much more!.
- It is customizable.
- It uses Firebase.
- It has all the basic features you want in your app.
- It is easy to use.

## Features

- Bulma CSS framework (Mobile friendly 🔥)
- Redux implementation
- Firebase/Redux implementation
- Authentication & authorization
- Create/modify/delete users
- Automatic email invitation to new users
- Image uploading
- Change/Reset Password built into the dasbhoard.
- User filtering and search
- Built-in CI (Continous integration)
- Built-in CD (Continous deployment)
- PWA ready thanks to CRA and Firebase
- Multi-tenancy
- Internationalization (English/Spanish)
- Ability to choose between realtime database or firestore

## Tech Stack

### Core

- [Create React App](https://github.com/facebook/create-react-app) (★ 76.5k) this project was bootstrapped with create react app (see [user guide](https://create-react-app.dev/docs/getting-started)).
- [Bulma](https://bulma.io/) (★ 38.7k) CSS framework to reduce development time and have a nice UI.
- [Redux](https://redux.js.org/) (★ 52.4k) for in-app state management (see [docs](https://redux.js.org/introduction/getting-started)).
- [React-redux](https://react-redux.js.org/) (★ 19k) official react bindings for redux (see [docs](https://react-redux.js.org/introduction/quick-start)).
- [Redux-act](https://github.com/pauldijou/redux-act) (★ 1.4k) opinionated library to create actions and reducers.
- [Redux-thunk](https://github.com/reduxjs/redux-thunk) (★ 14.1k) redux [middleware](https://redux.js.org/advanced/middleware) for asynchronous actions.
- [Redux-persist](https://github.com/rt2zz/redux-persist) (★ 9.8k) persists store state between sessions.
- [React-redux-toastr](https://github.com/diegoddox/react-redux-toastr) (★ 703) a toastr message implemented with Redux.
- [React-router](https://github.com/ReactTraining/react-router) (★ 39.6k) declarative routing for React.
- [Prop-Types](https://reactjs.org/docs/typechecking-with-proptypes.html) (★ 3.4k) typechecking for react component props.
- [Classnames](https://github.com/JedWatson/classnames) (★ 11.9k) a simple javascript utility for conditionally joining classNames together.
- [React-datepicker](https://github.com/Hacker0x01/react-datepicker) (★ 4.5k) a simple and reusable datepicker component for React.
- [React-table](https://github.com/tannerlinsley/react-table) (★ 9.6k) hooks for building fast and extendable tables and datagrids for React.
- [React-spinners](https://github.com/davidhu2000/react-spinners) (★ 1.2k) a collection of loading spinner components for React.
- [Firebase](https://firebase.google.com/) for serverless architecture - CDN Hosting, Realtime Database, Authentication, Storage and Cloud Functions (see [docs](https://firebase.google.com/docs/web)).
- [FirebaseUI-web-react](https://github.com/firebase/firebaseui-web-react) (★ 732) social media authentication library.
- [Format.js](https://formatjs.io/) (★ 11.7k) libraries for internationalization (see [docs](https://formatjs.io/docs/basic-internationalization-principles)).
- [date-fns](https://date-fns.org/) (★ 22.3k) date utility library (see [docs](https://date-fns.org/docs/Getting-Started)).
- [cross-env](https://github.com/kentcdodds/cross-env) (★ 4.9k) run scripts that set and use environment variables across platforms (see [docs](https://www.npmjs.com/package/cross-env)).
- [Inquirer](https://github.com/SBoudrias/Inquirer.js/) (★ 12.2k) A collection of common interactive command line user interfaces (see [docs](https://github.com/SBoudrias/Inquirer.js/#documentation)).

### Unit Testing

- [Jest](https://jestjs.io/) (★ 29.9k) as testing framework (see [docs](https://jestjs.io/docs/en/getting-started)).
- [Enzyme](https://airbnb.io/enzyme/) (★ 18.5k) to test react components in Jest.
- [Redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store) (★ 2.1k) to test redux actions, reducers and store state in Jest.

### Linting

- [ESLint](https://eslint.org/) (★ 15.9k) configured to follow the coding style of [Airbnb](https://github.com/airbnb/javascript).
- [Prettier](https://prettier.io/) (★ 35.5k) as code formatter.
- [Lint-staged](https://github.com/okonet/lint-staged) (★ 6.5k) run linters on git staged files.

### Cloud functions

- [Firebase-admin](https://github.com/firebase/firebase-admin-node) (★ 790) Firebase Admin Node.js SDK.
- [Firebase-functions](https://github.com/firebase/firebase-functions) (★ 658) Firebase SDK for Cloud Functions.
- [Typescript](https://github.com/Microsoft/TypeScript) (★ 61.1k) TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
- [TSlint](https://github.com/palantir/tslint) (★ 5.8k) An extensible linter for the TypeScript language.
- [Firebase-function-tools](https://github.com/TarikHuber/react-most-wanted) (★ 780) a tool for naming and loading our Cloud Functions.
- [Glob](https://github.com/isaacs/node-glob) (★ 6.2k) glob functionality for Node.js.
- [Camelcase](https://github.com/sindresorhus/camelcase) (★ 423) convert a dash/dot/underscore/space separated string to camelCase.
- [Resize Image](https://github.com/firebase/extensions/tree/master/storage-resize-images) (★ 372) Firebase Extension to create resized versions of images uploaded to Cloud Storage.

#### Unit Testing

- [Firebase-functions-test](https://github.com/firebase/firebase-functions-test) (★ 117) unit testing library for Cloud Functions for Firebase.
- [Mocha](https://github.com/mochajs/mocha) (★ 19.4k) simple, flexible, fun javascript test framework for node.js & the browser.
- [Chai](https://github.com/chaijs/chai) (★ 6.8k) BDD / TDD assertion framework for node.js and the browser that can be paired with any testing framework.
- [Chai-as-promised](https://github.com/domenic/chai-as-promised/) (★ 1.4k) Extends Chai with assertions about promises.
- [Ts-node](https://github.com/TypeStrong/ts-node) (★ 7k) TypeScript execution and REPL for node.js, with source map support.

## Prerequisites

- [Firebase](https://firebase.google.com/) account in order to set up the serverless BaaS for the project.
- [Node.js](https://nodejs.org/) v12.15.0 or higher (React frontend) and v10.0.0 (Cloud Functions) (You can install them using [NVM](https://github.com/nvm-sh/nvm)).
- [VSCode](https://code.visualstudio.com/) editor (preferred) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [Babel JavaScript ](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel) plug-ins.

You also need to be familiar with [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [SASS](https://sass-lang.com/), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) ([ES2015](http://babeljs.io/learn-es2015/)) and [React](https://reactjs.org/) with [React Hooks](https://reactjs.org/docs/hooks-intro.html).

## Documentation

<ul>
  <li><a href="https://docs.react-firebase.com/">Introduction</a></li>
    <li><a href="https://docs.react-firebase.com/getting-started">Getting Started</a></li>
    <li><a href="https://docs.react-firebase.com/getting-started#react-frontend">React Frontend</a></li>
    <li><a href="https://docs.react-firebase.com/getting-started/cloud-functions">Cloud Functions</a></li>
    <li><a href="https://docs.react-firebase.com/getting-started/continuous-integration-deployment">CI/CD</a></li>
    <li><a href="https://docs.react-firebase.com/features/internationalization">Internationalization</a></li>
    <li><a href="https://docs.react-firebase.com/features/file-upload">File Upload</a></li>
    <li><a href="https://docs.react-firebase.com/features/social-media-authentication">Social Media Authentication</a></li>
</ul>

## Demo

For requesting access to the <a href="https://react-firebase.com/">demo site</a> please <a href="https://createthrive.com/contact">contact us</a>.

## Contributors

We'd like to thank these awesome people who made this whole thing happen:

<ul>
  <li><a href="https://github.com/MateoKruk">Mateo Kruk</a></li>
    <li><a href="https://github.com/tpiaggio">Tomas Piaggio</a></li>
    <li><a href="https://github.com/jbheber">Juan Heber</a></li>
    <li><a href="https://github.com/vikdiesel">Viktor Kuzhelny</a></li>
    <li><a href="https://github.com/TOPOFGR">Franco Galeano</a></li>
    <li><a href="https://github.com/jfocco">Juan Focco</a></li>
</ul>

## License

This project is licensed under the MIT license, Copyright (c) 2020 <a href="https://createthrive.com">CreateThrive</a>. For more information see LICENSE.md.
