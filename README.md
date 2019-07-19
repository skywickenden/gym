# gym

WORK IN PROGRESS

A small webapp for logging and graphing activity down the gym.

Demonstrates usage of:

 * Docker for a unified developement environment and easy pushing to production
 * React - using hooks
 * Linaria for CSS
 * Relay for graphql embeded in React
 * Webpack and babel for minification and transpilation
 * Express and graphql-js for a graphql api 
 * Mongoose for a mongodb 
 * Jest - with react-testing-library - for testing on fronted and back
 * Eslint for linting
 
### Setup
 
Clone into a folder. Copy `example.env` into `.env` and edit `.env` to add unique db passwords and ensure that the ports the app runs on are available. Copy `example.mong-init.js` into `mong-init.js` and add the same passwords as entered into `.env`.
 
 Run `docker-compose build` followed by `docker-comose up`. 
 
### Developing

To install new packages: Run the docker with `docker-compose run --rm client sh` or `docker-compose run --rm api sh` and then use `npm install <package_name>`. Type `exit` to return to your command line and then rebuild and rerun - only this time add a -V switch... `docker-compose up -V`. This will force the deletion of the anonymous node_package volume and prevent a [docker race condition issue.](https://github.com/docker/compose/issues/4337)

Graphql schema changes are developed on the api. They then need copying to the client and compiling:

  * A service that watches for graphql schema changes on the server and copies them to the local schema `docker-compose run --rm client npm run getschema`
  * A service that compiles react-graphql schema code into graphql for hot reloading. `docker-compose run --rm client npm run relay`
  
There is a seperate test runner for both client and api

  * The test runner. `docker-compose run --rm client npm run test`
  * The test runner. `docker-compose run --rm api npm run test`
  
There is a seperate linting process for both client and api

  * The test runner. `docker-compose run --rm client npm run lint`
  * The test runner. `docker-compose run --rm api npm run lint`
