
<h1 align="center">Zendesk Coding Challenge - Front End</h1>

<p align="center">
<img src="https://img.shields.io/badge/react-17.0.2-blue">
<img src="https://img.shields.io/badge/axios-0.21.0-brightgreen">
<img src="https://img.shields.io/badge/react_dom-17.10.2-yellow">
<img src="https://img.shields.io/badge/reduc-thunk-2.3.0-purple">
<img src="https://img.shields.io/badge/react_redux-7.2.4-orange">
</p>

<h2>Task Description</h2>
<p align='justify'> The task is to build a web application for purchasing subscription using mordern client-side framework </p>

<h2>Solution</h2>
<p align='justify'> The functionalities of the task is achieved using React and Redux </p> 
 <img width="390" height="190" src="https://miro.medium.com/max/966/1*jYy3Hc1qmQL9gpYF5rI3Sg.png">

## Features
- View Current Subscription
- Update Subscription

# Installation
The application is containerized using Docker and hence installation can be done using Docker.

## Prerequisite
You will need the following installed before running the application

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Steps to install
 1. Git clone [zendesk-coding-challenge](https://github.com/Aishwarya55/zendesk-coding-challenge.git) or download zip
 2. Run the App by typing `docker compose up dev`. This runs the application in the development mode and the application can directly be accessed by navigating to `http://localhost:3000` in your web browser.

 # About the application and Usage
 ## Project Structure
 The entire application is structured as separate components and the state management is achieved using Redux while the UI or the View of the application is achieved using React.

The main code of the application is present within the `src` folder.
The project is structured as shown below

 ```
src
├── __tests__
├── actions
├── components
│   └── views
│       ├── home
│       |    └── index.js
|       └── subscription
|       |    └── index.js
|       subscription-submission
|       |     └── index.js
|        └── other components......
├── reducers
├── store
├── actions
└── index.js
```

The actions folder contains all Redux action creators and the reducers folder contains the reducers to specify the state transformation by the actions.

The components folder contains all components for the view and also shared components. The view folders contains the pages in the application. The application contains only one page which is the `home` and the `subscription` and `subscription-submission` are sub components of the `home` page.

The `loader` component is a shared component which displays the loder on a page and the `navigation` component defined the global routing of the application with respect to the different pages using `react-router`.

The `store` folders defined the Redux store which will be linked to the React application for state management.

All the unit tests are present within the `__test__` folder.

## Data for the application
The data for the application is fetched using mock server written using `miragejs`. The mocked data will be used in all three modes: development, test and production. The mock server is available in the file `mock-server.js`

## Application in Dev mode
The entire application is dockerized. Hence navigating to the project directory (where the `Dockerfile` is located and contains the `src` directory) and running `docker compose up dev` will run the docker container in development mode accessible from `http://localhost:3000`

Note: Run `docker compose stop` to stop the docker containers.

## Application in Production mode
The application build is dockerized to run on nginx. Hence navigating to the project directory (where the `Dockerfile` is located and contains the `src` directory) and  running `docker compose up prod` will run the docker container on nginx and the application will be acessible from `http://localhost:80`

Note: Run `docker compose stop` to stop the docker containers.

## Testing the Application

### Running the tests
Units Tests are written for each of the testable components in the application using `Jest` and `Enzyme`.

The test scripts are also dockerized. Hence running `docker compose up test` will run all the test scripts.

Note: Run `docker compose stop` to stop the docker containers.

### Structuring of unit tests

The `__tests__` folder contains the following files

`actions_test`: Contains test runners to perform unit testing on action creators of Redux.
`subscription_reducer_test`: Contains test runners to perform unit testing on reducers of Redux.
`subscription_component_test`: Contains test runners to perform unit testing for the subscription component
`subscription_snapshot_test`: Contains test runners to perform snapshot testing for subscription component
`subscription_submission_component_test`: Contains test runners to perform unit testing for the subscription submission component which appears after updating subscription
`subscription_submission_snapshot_test`: Contains test runners to perform snapshot testing for subscription submission component

## Other available scripts

### `npm install`
Installs dependencies of the application

### `npm start`
Runs the application in development mode and requires packages to be installed using `npm install`.

### `npm test`
Launches the test runner in the interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run docker-stop`
Stops the running docker containers


## Future Enhancements
- Display Error message when Backend sends error response
- Support Multiple products
- Additional screens for payment and contact information
- Support multiple currencies