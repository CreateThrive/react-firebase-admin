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
- [Getting started](#getting-started)
  - [Setting up the Firebase project locally](#setting-up-the-firebase-project-locally)
  - [Setting up the React frontend](#setting-up-the-react-frontend)
- [React frontend](#react-frontend)
  - [Folder structure](#folder-structure)
  - [Installing dependencies](#installing-dependencies)
  - [Development server](#development-server)
  - [Running tests](#running-tests)
  - [How to deploy](#how-to-deploy)
- [Cloud functions](#cloud-functions-1)
  - [Folder structure](#folder-structure-1)
  - [Installing dependencies](#installing-dependencies-1)
  - [Authenticate to your Firebase account](#authenticate-to-your-firebase-account)
  - [Listing Firebase projects](#listing-firebase-projects)
  - [Listing aliases available in the project](#listing-aliases-available-in-the-project)
  - [Selecting an alias](#selecting-an-alias)
  - [Creating a new cloud function](#creating-a-new-cloud-function)
  - [Testing functions locally](#testing-functions-locally)
  - [Testing functions in online mode](#testing-functions-in-online-mode)
  - [Deployment](#deployment)
- [Continuous integration/deployment](#continuous-integrationdeployment)
  - [Workflows folder structure](#workflows-folder-structure)
  - [Active workflows in the project](#active-workflows-in-the-project)
  - [Setting up GitHub Actions in your repo](#setting-up-github-actions-in-your-repo)
  - [Writing new workflows](#writing-new-workflows)
- [Environment Variables](#environment-variables)
- [Demo](#demo)
- [Internationalization](#internationalization)
  - [Adding another Language](#adding-another-language)
  - [Creating your translation file](#creating-your-translation-file)
  - [How to translate a Text](#how-to-translate-a-text)
  - [How to translate a Text with a variable](#how-to-translate-a-text-with-a-variable)
  - [How to internationalize a Date](#how-to-internationalize-a-date)
  - [How to add your language on DatePicker](#how-to-add-your-language-on-datepicker)
- [File Upload](#file-upload)
  - [Image resize extension](#image-resize-extension)
  - [Storage Rules](#storage-rules)
- [Authentication via social media accounts](#authentication-via-social-media-accounts)
  - [How it works?](#how-it-works)
  - [Can I add more login methods?](#can-i-add-more-login-methods)
  - [Facebook](#facebook)
    - [Enabling Facebook with Firebase](#enabling-facebook-with-firebase)
    - [Facebook for developers App configuration](#facebook-for-developers-app-configuration)
    - [Continuing with the Firebase setup](#continuing-with-the-firebase-setup)
    - [Configure Facebook sign-in/sign-up for production](#configure-facebook-sign-insign-up-for-production)
  - [Google](#google)
  - [Microsoft](#microsoft)
    - [Azure App configuration](#azure-app-configuration)
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
- [Format.js](https://formatjs.io/) (★ 11.7k) libraries for internationalization (see [docs](https://formatjs.io/docs/basic-internationalization-principles)).
- [date-fns](https://formatjs.io/) (★ 22.3k) date utility library (see [docs]https://date-fns.org/docs/Getting-Started)).

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

## Getting started

- Clone the project into your computer! (more info on [cloning a repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)).
- Create a Firebase Project in the [Firebase Console](https://console.firebase.google.com/).
- In the **_Database_** section set up your database as a **_Real Time Database_** as **_locked mode_** (later on we will setup our own custom rules).
- In the **_Storage_** section set up your storage bucket with the default values provided by Firebase.
- Setup your sign-in providers in the **_Authentication_** section. On the **_Sign in method_** tab, enable **_Email/Password_** provider with the **_Email Link_** feature.
- Copy the config values you get from you Firebase dashboard's **_Web Setup_** option and enter them into a `.env` file with the same structure as the `.env.example` in the root directory of the repository.
- Setup the [image resize extension](https://firebase.google.com/products/extensions/storage-resize-images) in your Firebase project. For instructions go to the [File upload section](#file-upload)

### Setting up the Firebase project locally

First we need to install the Firebase cli tool and then initialize our new Firebase project.

Run the following commands in the root of the repository:

```
npm install -g firebase-tools
```

```
firebase init
```

Select the firebase project you created in the previous step, when prompted select the services you want to setup and check **_Database_**, **_Functions_**, **_Hosting_** and **_Storage_**.

**_Database_**:

- Leave the default name for our rules `.json` file.
- Select **_No_** when prompted if you want to overwrite the file containing our rules.

**_Hosting_**:

- Set **build** as our public directory for our hosting files.
- Select **_Yes_** when asked if we want our hosting to be configured as a single page application.

**_Storage_**

- For the file we should use for the Storage Rules select **storage.rules**.

**_Functions_**:

- For the language to be used in our functions select **_TypeScript_**.
- If we want to use ESLint as our linting tool select **_No_**.
- If we want to overwrite the `package.json`, `.gitignore` and `index.js` select **_No_**.
- Then select **_Yes_** so that we install our dependencies with npm.

Run the following command on the **functions/** folder (Using Node v10.0.0):

```
npm run setup-firebase
```

You'll get prompted to enter the path to you service account key file. To generate it, go to your **_Firebase Dashboard_**, **_Project settings_** tab and then to **_Service accounts_** option, right there you can generate your private key (more info on this [here](https://firebase.google.com/docs/admin/setup#initialize-sdk)).

You'll need to enter the **_email_** and **_password_** for the admin account of the admin dashboard. With this in place, you've successfully created your admin account for the dashboard.

### Setting up the React frontend

Run the following commands in the root of the repository (Using Node v12.15.0 or higher):

```
npm run setup-admin-dashboard
```

If you go to your dashboard you'll see all the Firebase services are now deployed.

## React frontend

### Folder structure

```bash
src/
├── assets/
│   └── users-default-logo.svg                # Images and other static content
├── components/                               # UI components
│   └── Component/
│       ├── __snapshots__/
│       │     └── Component.test.js.snap
│       ├── Component.test.js
│       ├── Component.module.scss
│       └── index.js
├── pages/                                   # React components that represent website pages
│   ├── Page/
│   │   ├── __snapshots__/
│   │   │     └── Page.test.js.snap
│   │   ├── Page.test.js
│   │   ├── Page.module.scss
│   │   └── index.js
│   └── Router/                             # All the routing related stuff
│       ├── __snapshots__/
│       │     └── Router.test.js.snap
│       ├── Router.test.js
│       ├── paths.js
│       └── index.js
├── state/                                  # Where we have our actions and reducers
│   ├── actions/
│   │   └── action.js
│   ├── reducers/
│   │   ├── reducer/
│   │   │   ├── index.js
│   │   │   └── reducer.test.js
│   │   └── index.js
│   └── store.js
├── utils/                                 # Helper functions
│   ├── index.js
│   ├── util_1.js
|   └── util_2.js
├── hooks/                                 # Custom hooks
│   ├── index.js
│   ├── hook_1.js
|   └── hook_2.js
├── languages/                             # All the JSON files for each language
|   ├── language_1.json
|   └── language_2.json
├── index.js
├── index.scss
├── serviceWorker.js
└── setupTests.js
```

### Installing dependencies

```javascript
npm install
```

You can use `yarn` as well if you want.

### Development server

```javascript
npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You'll also see any lint errors in the console.

### Running tests

```javascript
npm test
```

Launches the test runner in the interactive watch mode.

### How to deploy

```
npm run deploy
```

## Cloud functions

### Folder structure

```
functions/
├── src/
│     ├── auth/
│     │     ├── onCreate.function.ts
|     │     └── onDelete.function.ts
│     ├── db/
│     │    ├── users/
│     │    │    ├── onCreate.function.ts
│     │    │    ├── onModify.function.ts
│     │    │    └── ... other database functions ...
│     ├── storage/
│     │   ... storage functions ...
│     ├── https/
│     │    ├── createUser.function.ts
│     │    └── ... other https functions ...
│     └── index.ts
├── test/
│     ├── db/
│     │    ├── users/
│     │    │    ├── onDelete.test.ts
│     │    │    ├── onUpdate.test.ts
│     │    │    └── ... other database tests ...
│     ├── https/
│     │    ├── createUser.test.ts
│     │    └── ... other https tests ...
│     └── util/
│          ├── config.ts
│
```

### Installing dependencies

From the functions folder run:

```javascript
npm install
npm install -g firebase-tools
```

### Authenticate to your Firebase account

```javascript
firebase login
```

### Listing Firebase projects

```javascript
firebase projects:list
```

### Listing aliases available in the project

```javascript
firebase use
```

### Selecting an alias

We should use staging alias while testing new functionality.

```javascript
firebase use staging
```

### Creating a new cloud function

Functions are automatically loaded from the index.js file if you follow the naming convention and folder structure, no need to add it manually.

Naming:

<ul>
    <li>The naming of functions should indicate the trigger and not what they are doing.</li>
    <li>Name your files according to the trigger you use ( onWrite, onCreate, onUpdate , onChange and onDelete).</li>
    <li>Functions should end with .function.js to get loaded.</li>
</ul>

Folders:

<ul>
    <li>Functions should be stored inside the folder that corresponds to the service that triggers the function. For example: the function onCreate.function.js inside `auth/` gets triggered when a new user is created on the authentication service of Firebase.</li>
</ul>

### Testing functions locally

We can test functions locally but currently we cannot test other services of Firebase like Realtime Database, Firestore, etc. So be cautious, your local functions will be interacting with services deployed in staging.

Cloud functions run in a Node.js environment with version 8 and the React frontend with > 12 or the latest one. So a tool like [Node Version Manager](https://github.com/nvm-sh/nvm) comes in handy in order to seamlessly change Node versions between terminal windows.

To initialize the emulator with functions only, run:

```javascript
firebase emulators:start --only functions
```

After it initializes, you should get your endpoints to test your HTTP functions:

```javascript
✔  functions[requestsApp]: http function initialized (http://localhost:5001/...../requestsApp).
```

More information about the [Firebase Emulator](https://firebase.google.com/docs/rules/emulator-setup).

### Testing functions in online mode

Testing your cloud functions online is very simple and easy.

For that, you only have to set the variables localted in the env.example.json inside /functions folder. (Remember to rename the file to env.json)

Follow these steps for setting up your env.json file:

- The first 3 properties **_"databaseURL"_**, **_"storageBucket"_** and **_"projectId"_** are the same ones previously added to the frontend .env file.
- For **_"serviceAccountKey"_** you should do the following:
  - Go to your proyect in the Firebase dashboard, click on **_Project settings_** and then click on **_Service accounts_** tab.
  - After that you'll be able to click on **_Generate new private key_** button and a json file containing your service account's credentials will be downloaded.
  - Place that file in your project and include the location of it into the **_"serviceAccountKey"_** in your env.json file.

After that, open your terminal, navigate to the /functions folder and execute **npm test**.

_Warning: Use extra caution when handling service account credentials in your code. Do not commit them to a public repository, deploy them in a client app, or expose them in any way that could compromise the security of your Firebase project._

### Deployment

When a pull request gets merged into development, functions are deployed automatically to the staging project in Firebase. Likewise, when merging/pushing into master, they're deployed to production.

We can manually deploy our project with the following command.

```javascript
firebase deploy
```

This will deploy Hosting, Functions and DB rules. Be sure to build the React frontend before deploying to Firebase.

If we want to deploy only certain services, we can do it with the following command. In this example we're only deploying our functions.

```
firebase deploy --only functions
```

It's possible to deploy only a specific function.

```
firebase deploy --only functions:myFunction
```

We can deploy more than one function at a time.

```
firebase deploy --only functions:myFunction,functions:anotherfunction
```

## Continuous integration/deployment

We use [GitHub Actions](https://github.com/features/actions) for our CI/CD. It consists of workflows written in a .yml file similar to other CI/CD tools like travis, jenkins, etc.

Each workflow is triggered by events like push, commits and other [GitHub API events](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows).

### Workflows folder structure

```bash
.github/
└── workflows/
    ├── production-deployment.yml
    ├── pull-requests.yml
    └── staging-deployment.yml
```

### Active workflows in the project

<ul>
    <li>Pull requests: gets triggered on pull request of branches: master, feature/* and development. It builds and runs the tests of the React frontend.</li>
    <li>Staging deployment: gets triggered on commits in the development branch. It builds the React frontend and deploys: hosting, functions and DB rules.</li>
    <li>Production deployment: gets triggered on commits in the master branch. It builds the React frontend and deploys: hosting, functions and DB rules.</li>
</ul>

### Setting up GitHub Actions in your repo

To get the workflows we mentioned previously up and running, you'll need to have two Firebase Projects, one will be your production environment and the other one your staging environment.

You will need to set up your environment variables as [GitHub Secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets), both for your staging and production projects.

Also, you'll need to set up your `FIREBASE_TOKEN` secret. You get this token by logging in using the command `firebase login:ci` in your terminal. More info on this [Firebase login CI](https://firebase.google.com/docs/cli#cli-ci-systems).

After setting up all your github secrets, they should look like this:

![Boilerplate - GitHub Secrets](https://i.imgur.com/wjNw4fC.png)

### Writing new workflows

You can refer to this on the [GitHub Actions documentations](https://help.github.com/en/actions).

## Environment Variables

Refer to the .env.example file in the root folder of the project to see what variables are currently in use.

## Demo

For requesting access to the [demo](https://react-firebase-admin-eeac2.firebaseapp.com/) site please [contact us](https://createthrive.com/contact).

## Internationalization

For the internationalization we decided to choose the library [Format.js](https://formatjs.io/) using react-intl as the react integration. We made a wrapper called **LanguageWrapper** that contains all of our translation logic. Apart from that, we save the language preferences of the user in the redux store and we persist it using the local storage. The user has the option to change their language preferences.

![Boilerplate - Dinamical Internationalization](https://media.giphy.com/media/St3bw0rjlBQmKzf6fC/source.gif)

### Adding another Language

- Create a `.json` file on `src/languages` for each language that you want to add, the `.json` name should be the languages.
- Replace every text you want to translate on your project with the **useFormatMessage** hook.
- Fill each `.json` with every `id` for all text translation used on every **useFormatMessage** and the text that you want to be seen.
- Import your `.json` file/s on the `src/utils/index.js` and add them to `messages`.
- Place your icon/s for your language/s on `src/assets`.
- Import your icon/s and add it/them to `flags` on `src/utils/index.js`.
- Import your language/s from the `date-fns` library and then call **registerLocale** and pass your import to make sure **DatePicker** can use your language. Then put your language format on **dateFormat** for the **DatePicker**.

### Creating your translation file

The `.json` file must be filled with each text that wants to be translated. Each translation is made by an **_id_** and the **_text_** for that language.
The id should be the file name where it is located + an **id** for the text.

```javascript
{
  "App.title":"Title"
}
```

### How to translate a Text

**Before Replacing**

```javascript
<h1>Title</h1>
```

**After Replacing**

`useFormatMessage` is receiving just the text id, but this hook can also recieve a default message, a description and a value (in case your texts receives a variable).

```javascript
<h1>useFormatMessage('App.Title')</h1>
```

### How to translate a Text with a variable

**Before Replacing**

```javascript
const example = 'World';
<p>Hello {example}!</p>;
```

**After Replacing**

```javascript
const example = 'World';
<p>useFormatMessage('App.helloWorld', { world: example })</p>;
```

**On the `.json` file**

```javascript
{
  "App.helloWorld":"Hello {world}!"
}
```

### How to internationalize a Date

**Before Replacing**

```javascript
const date = Date.now();
<p>{date}</p>;
```

**After Replacing**

```javascript
const date = Date.now();
<p>{useFormatDate(date)}</p>;
```

### How to add your language on DatePicker

- Import your language from `date-fns/locale/[yourlanguage]`
- Add another **registerLocale** with your language as the first parameter and the import from `date-fns` as second parameter.
- Place your language with its date format on **dateFormat**.

## File Upload

For file upload, we used the [Firebase Client](https://firebase.google.com/docs/storage/web/upload-files?authuser=1#upload_files) together with **Firebase Storage** for our storage needs. We store the users profile image in a subfolder named `/users`.

### Image resize extension

We use [Resize Image extension](https://github.com/firebase/extensions/tree/master/storage-resize-images) for resizing every image uploaded to the storage.
Every image uploaded to the storage is resized to our size preference (`200px x 200px`).

**Setting your image resize**

If you want to install it from the cmd, you can execute:

```javascript
firebase ext:install storage-resize-images --project=projectId
```

With your own `projectId`.

Installing the extesion via de Firebase dashboard:

<ol>
<li>Go to your Firebase Proyect on <a href= "https://console.firebase.google.com/u/1/">Firebase Console</a> </li>
<li>Select extensions from the sidebar</li>
<li>Search for Resize Images extension</li>
<li>Click install on the extension</li>
<li>On extension configuration set sizes of resized images to 200x200 and the deletion of original file to true</li>
<li>Click on install extension</li>
</ol>

In case you do not want to upload a resized version and upload the original file, you should avoid step **5**.

### Storage Rules

To make images reachable, we needed to set our storage rules to allow users to `write` on the storage made for the user logo, only if they are authenticated, but they can always `read`, this was set for saving the user´s logo path on the database.

**Should look like this**

```javascript
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{imageId} {
      allow write: if request.auth!=null;
      allow read: if true;
    }
  }
}
```

## Authentication via social media accounts

In this boilerplate users have the option to login via e-mail and password but also they can sign-up/sign-in with their Facebook, Google and Microsoft accounts.

<p align="center">
  <img src="https://i.imgur.com/xQz5pSR.png">
</p>

### How it works?

We implemented social media authentication using Firebase!. You can take a look at their documentation [here](https://firebase.google.com/docs/auth/web/google-signin). In the following section we will explain how to configure each of these authentication methods.

### Can I add more login methods?

Yes you can!. We already have the setup in place for more login methods like Twitter, GitHub, etc. You can add them without changing much code at all. You can see other login methods provided by Firebase [here](https://firebase.google.com/docs/auth/web/start).

### Facebook

#### Enabling Facebook with Firebase

1. Go to your [Firebase console](https://console.firebase.google.com/).
2. Go to the "**Develop**" option and then click on "**Authentication**".
3. Go to the tab "**Sign-in method**".
4. Now select the "**Facebook**" option and copy the **_OAuth redirect URL_** provided by Firebase.
5. Keep this window open because we need to configure the app on Facebook's developer site.

#### Facebook for developers App configuration

Log-in/Sign-up into your [Facebook for developers](https://developers.facebook.com/) account, create an app and configure it to make Sign-in via Facebook available.

<ol>
<li>Name your App</li>
<li>Click on configure on Log in with Facebook</li>
<li>Choose the Web option </li>
<li>Select Web, set http://localhost:3000 as the URL</li>
<li>Select Product Settings > Facebook Login config on the Side Bar</li>
<li>Put your OAuth redirect URI (the one you copied in the past), you can verify your redirect URI at the buttom of this page</li>
<li>Select Configuration > Basic on the Side Bar</li>
<li>There you have your app id and your app secret for setting them on your project from the Firebase console</li>
</ol>

#### Continuing with the Firebase setup

<ol>
<li>Go to the Firebase Console window we left open in the previous steps.</li>
<li>Put the app id and the app secret we recieved from the last section.</li>
<li>Enable the Facebook provider.</li>
</ol>

Now you have configured Facebook auth in you project.

#### Configure Facebook sign-in/sign-up for production

<ol>
<li>Select Configuration > Basic on the Side Bar</li>
<li>Put your contact email and your privacy policy URL</li>
<li>At the buttom of the page, select Website and change the URL for your domain</li>
<li>Save Changes</li>
<li>Turn off the "on Development" switch</li> 
</ol>

You can have a more in-depth look about Facebook login with Firebase [here](https://firebase.google.com/docs/auth/web/facebook-login).

### Google

For setting your Google authentication you will only need to go to your project from the [Firebase console](https://console.firebase.google.com/), then select Authentication on the Side Bar and Sign-in method. Click the Google logo, select a Project support email, enable the Google provider and save.

You can have a more in-depth look about Google login with Firebase [here](https://firebase.google.com/docs/auth/web/google-signin).

### Microsoft

Go to your [Firebase console](https://console.firebase.google.com/), select the project, then select Authentication on the Side Bar and Sign-in method. Click the Microsoft logo, copy the redirect URL and keep this window open for later.

Before setting your Application id and the Application secret on the Microsoft Sign-in method from the Firebase console, you will need to log-in into your [Azure](https://portal.azure.com/) account, create an app and configure it to make Sign-in via Microsoft available.

#### Azure App configuration

<ol>
<li>Once you are logged to your account click the left, top corner and select Azure Active Directory.</li>
<li>Under Manage, select App registration.</li>
<li>Name your App.</li>
<li>Specify who can use the application.</li>
<li>Put your redirect URL (the one you already copied).</li>
<li>Select Register.</li>
<li>Select Certificates & secrets from the Side Bar.</li>
<li>Select Add a new client secret.</li>
<li>Set the expiration time.</li>
</ol>

For more on [Register](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) and [configure the app](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis).

**Firebase console**

<li>Go to the Firebase Console window from the beginning</li>
<li>Put the Application id, located on Overview on your Azure App.</li>
<li>Put Application secret, located on Certificates & secrets on your Azure App.</li>
<li>Enable the Microsoft provider.</li>

You can have a more in-depth look about Microsoft login with Firebase [here](https://firebase.google.com/docs/auth/web/microsoft-oauth).

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
